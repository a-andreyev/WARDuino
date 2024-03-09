#include <sys/_stdint.h>
#ifndef ARDUINO

/**
 * This file lists the primitives of the language and stores them in the
 * primitives
 *
 * Adding a primitive:
 *  1) Bump up the NUM_PRIMITIVES constant
 *  2) Define <primitive>_type
 *  3) Define a function void primitive(Module* m)
 *  4) Extend the install_primitives function
 *
 */
#include <sys/time.h>

#include <chrono>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <thread>

#include <zephyr/kernel.h>
#include <zephyr/drivers/gpio.h>
#include <zephyr/devicetree.h>
#include <zephyr/devicetree/gpio.h>
#include <zephyr/device.h>
#include <zephyr/dt-bindings/gpio/gpio.h>
#include <zephyr/drivers/pwm.h>

#include "../Memory/mem.h"
#include "../Utils/macros.h"
#include "../Utils/util.h"
#include "primitives.h"

#define NUM_PRIMITIVES 0
#define NUM_PRIMITIVES_ARDUINO 8

#define ALL_PRIMITIVES (NUM_PRIMITIVES + NUM_PRIMITIVES_ARDUINO)

// Global index for installing primitives
int prim_index = 0;

double sensor_emu = 0;

/*
   Private macros to install a primitive
*/
#define install_primitive(prim_name)                                       \
    {                                                                      \
        dbg_info("installing primitive number: %d  of %d with name: %s\n", \
                 prim_index + 1, ALL_PRIMITIVES, #prim_name);              \
        if (prim_index < ALL_PRIMITIVES) {                                 \
            PrimitiveEntry *p = &primitives[prim_index++];                 \
            p->name = #prim_name;                                          \
            p->f = &(prim_name);                                           \
        } else {                                                           \
            FATAL("pim_index out of bounds");                              \
        }                                                                  \
    }

#define def_prim(function_name, type) \
    Type function_name##_type = type; \
    bool function_name(Module *m)

// TODO: use fp
#define pop_args(n) m->sp -= n
#define get_arg(m, arg) m->stack[(m)->sp - (arg)].value
#define pushUInt32(arg) m->stack[++m->sp].value.uint32 = arg
#define pushInt32(arg) m->stack[++m->sp].value.int32 = arg
#define pushUInt64(arg)                 \
    m->stack[++m->sp].value_type = I64; \
    m->stack[m->sp].value.uint64 = arg
#define arg0 get_arg(m, 0)
#define arg1 get_arg(m, 1)
#define arg2 get_arg(m, 2)
#define arg3 get_arg(m, 3)
#define arg4 get_arg(m, 4)
#define arg5 get_arg(m, 5)
#define arg6 get_arg(m, 6)
#define arg7 get_arg(m, 7)
#define arg8 get_arg(m, 8)
#define arg9 get_arg(m, 9)

// The primitive table
PrimitiveEntry primitives[ALL_PRIMITIVES];

//
uint32_t param_arr_len0[0] = {};
uint32_t param_I32_arr_len1[1] = {I32};
uint32_t param_I32_arr_len2[2] = {I32, I32};
uint32_t param_I32_arr_len3[3] = {I32, I32, I32};
uint32_t param_I32_arr_len4[4] = {I32, I32, I32, I32};
uint32_t param_I32_arr_len10[10] = {I32, I32, I32, I32, I32,
                                    I32, I32, I32, I32, I32};

uint32_t param_I64_arr_len1[1] = {I64};

Type oneToNoneU32 = {
    .form = FUNC,
    .param_count = 1,
    .params = param_I32_arr_len1,
    .result_count = 0,
    .results = nullptr,
    .mask = 0x8001 /* 0x800 = no return ; 1 = I32*/
};

Type twoToNoneU32 = {
    .form = FUNC,
    .param_count = 2,
    .params = param_I32_arr_len2,
    .result_count = 0,
    .results = nullptr,
    .mask = 0x80011 /* 0x800 = no return ; 1 = I32; 1 = I32*/
};

Type threeToNoneU32 = {
    .form = FUNC,
    .param_count = 3,
    .params = param_I32_arr_len3,
    .result_count = 0,
    .results = nullptr,
    .mask = 0x800111 /* 0x800 = no return ; 1=I32; 1=I32; 1=I32*/
};

Type fourToNoneU32 = {
    .form = FUNC,
    .param_count = 4,
    .params = param_I32_arr_len4,
    .result_count = 0,
    .results = nullptr,
    .mask =
        0x8001111 /* 0x800 = no return ; 1 = I32; 1 = I32; 1 = I32; 1 = I32*/
};

Type oneToOneU32 = {
    .form = FUNC,
    .param_count = 1,
    .params = param_I32_arr_len1,
    .result_count = 1,
    .results = param_I32_arr_len1,
    .mask = 0x80011 /* 0x8 1=I32 0=endRet ; 1=I32; 1=I32*/
};

Type oneToOneI32 = {
    .form = FUNC,
    .param_count = 1,
    .params = param_I32_arr_len1,
    .result_count = 1,
    .results = param_I32_arr_len1,
    .mask = 0x80011 /* 0x8 1=I32 0=endRet ; 1=I32; 1=I32*/
};

Type twoToOneU32 = {
    .form = FUNC,
    .param_count = 2,
    .params = param_I32_arr_len2,
    .result_count = 1,
    .results = param_I32_arr_len1,
    .mask = 0x81011 /* 0x8 1=I32 0=endRet ; 1=I32; 1=I32*/
};

Type threeToOneU32 = {
    .form = FUNC,
    .param_count = 3,
    .params = param_I32_arr_len3,
    .result_count = 1,
    .results = param_I32_arr_len1,
    .mask = 0x810111 /* 0x8 1=I32 0=endRet ; 1=I32; 1=I32; 1=I32*/
};

Type fourToOneU32 = {
    .form = FUNC,
    .param_count = 4,
    .params = param_I32_arr_len4,
    .result_count = 1,
    .results = param_I32_arr_len1,
    .mask = 0x8101111 /* 0x8 1=I32 0=endRet ; 1=I32; 1=I32; 1=I32; 1=I32*/
};

Type tenToOneU32 = {
    .form = FUNC,
    .param_count = 10,
    .params = param_I32_arr_len10,
    .result_count = 1,
    .results = param_I32_arr_len1,
    .mask = 0x8101111111111 /* 0x8 1=I32 0=endRet ; 10 params 1=I32*/
};

Type NoneToNoneU32 = {.form = FUNC,
                      .param_count = 0,
                      .params = nullptr,
                      .result_count = 0,
                      .results = nullptr,
                      .mask = 0x80000};

Type NoneToOneU32 = {.form = FUNC,
                     .param_count = 0,
                     .params = nullptr,
                     .result_count = 1,
                     .results = param_I32_arr_len1,
                     .mask = 0x81000};

Type NoneToOneU64 = {.form = FUNC,
                     .param_count = 0,
                     .params = nullptr,
                     .result_count = 1,
                     .results = param_I64_arr_len1,
                     .mask = 0x82000};

def_prim(chip_delay, oneToNoneU32) {
    k_msleep(arg0.uint32);
    pop_args(1);
    return true;
}

struct gpio_dt_spec specs[] = {
        DT_FOREACH_PROP_ELEM_SEP(DT_PATH(zephyr_user), warduino_gpios,
                                 GPIO_DT_SPEC_GET_BY_IDX, (,))
};

static const struct pwm_dt_spec pwm_led0 = PWM_DT_SPEC_GET_BY_IDX(DT_PATH(zephyr_user), 0);
static const struct pwm_dt_spec pwm_led1 = PWM_DT_SPEC_GET_BY_IDX(DT_PATH(zephyr_user), 1);

def_prim(chip_pin_mode, twoToNoneU32) {
    gpio_dt_spec pin_spec = specs[arg1.uint32];
    gpio_pin_configure(pin_spec.port, pin_spec.pin, arg0.uint32 == 0 ? GPIO_INPUT: GPIO_OUTPUT);
    pop_args(2);
    return true;
}

def_prim(chip_digital_write, twoToNoneU32) {
    printf("chip_digital_write(%u,%u)\n", arg1.uint32, arg0.uint32);
    gpio_dt_spec pin_spec = specs[arg1.uint32];
    gpio_pin_set_raw(pin_spec.port, pin_spec.pin, arg0.uint32);
    pop_args(2);
    return true;
}

def_prim(chip_digital_read, oneToOneU32) {
    printf("chip_digital_read(%u)\n", arg0.uint32);
    gpio_dt_spec pin_spec = specs[arg0.uint32];
    uint8_t res = gpio_pin_get_raw(pin_spec.port, pin_spec.pin);
    pop_args(1);
    pushUInt32(res);
    return true;
}

def_prim(print_int, oneToNoneU32) {
    printf("%u\n", arg0.uint32);
    pop_args(1);
    return true;
}

bool drive_pwm(float pwm1, float pwm2) {
    if (!pwm_is_ready_dt(&pwm_led0)) {
		printf("Error: PWM device %s is not ready\n",
		       pwm_led0.dev->name);
		return false;
	}
    
    printf("pwm1 = %f, pwm2 = %f\n", pwm1, pwm2);
    
    int ret = pwm_set_pulse_dt(&pwm_led0, pwm1 * pwm_led0.period);
    if (ret) {
        printf("Error %d: failed to set pulse width\n", ret);
        return false;
    }
    
    ret = pwm_set_pulse_dt(&pwm_led1, pwm2 * pwm_led0.period);
    if (ret) {
        printf("Error %d: failed to set pulse width\n", ret);
        return false;
    }
    return true;
}

bool drive_motor(float speed) {
    float pwm1 = 0;
    float pwm2 = 0;
    if (speed > 0) {
        pwm1 = speed;
    }
    else {
        pwm2 = -speed;
    }

    return drive_pwm(pwm1, pwm2);
}

def_prim(motor_test, oneToNoneU32) {
    int32_t speed = (int32_t) arg0.uint32;
    printf("motor_test(%d)\n", speed);
    drive_motor(speed / 10000.0f);
    pop_args(1);
    return true;
}

def_prim(drive_motor_for_ms, twoToNoneU32) {
    int32_t speed = (int32_t) arg0.uint32;
    printf("drive_motor_for_ms(%d, %d)\n", speed, arg1.uint32);

    drive_motor(speed / 10000.0f);
    k_msleep(arg1.uint32);
    drive_pwm(1.0f, 1.0f);
    pop_args(2);
    return true;
}

class MotorEncoder {
    static void encoder_pin5_edge_rising(const struct device *dev, struct gpio_callback *cb, uint32_t pins) {
        MotorEncoder *encoder = CONTAINER_OF(cb, MotorEncoder, pin5_encoder_cb_data);
        if (!encoder->expect_pin5_int)
            return;
        
        if (!gpio_pin_get_raw(encoder->pin6_encoder_spec.port, encoder->pin6_encoder_spec.pin)) {
            encoder->angle++;
        }
        else {
            encoder->angle--;
        }
        printk("Rising edge detected on encoder pin5, angle %d\n", encoder->angle);
        encoder->expect_pin5_int = false;
        encoder->expect_pin6_int = true;
    }
    
    static void encoder_pin6_edge_rising(const struct device *dev, struct gpio_callback *cb, uint32_t pins) {
        MotorEncoder *encoder = CONTAINER_OF(cb, MotorEncoder, pin6_encoder_cb_data);
        if (!encoder->expect_pin6_int)
            return;
        
        if (gpio_pin_get_raw(encoder->pin5_encoder_spec.port, encoder->pin5_encoder_spec.pin)) {
            encoder->angle++;
        }
        else {
            encoder->angle--;
        }
        printk("Rising edge detected on encoder pin6, angle %d\n", encoder->angle);
        encoder->expect_pin6_int = false;
        encoder->expect_pin5_int = true;
    }
    
public:
    MotorEncoder(gpio_dt_spec pin5_encoder_spec, gpio_dt_spec pin6_encoder_spec) : 
        pin5_encoder_spec(pin5_encoder_spec), 
        pin6_encoder_spec(pin6_encoder_spec),
        angle(0),
        target_angle(0),
        expect_pin5_int(true),
        expect_pin6_int(true)
    {
        gpio_pin_interrupt_configure_dt(&pin5_encoder_spec, GPIO_INT_EDGE_RISING);    
        gpio_init_callback(&pin5_encoder_cb_data, MotorEncoder::encoder_pin5_edge_rising, BIT(pin5_encoder_spec.pin));
        gpio_add_callback(pin5_encoder_spec.port, &pin5_encoder_cb_data);
        
        gpio_pin_interrupt_configure_dt(&pin6_encoder_spec, GPIO_INT_EDGE_RISING);
        gpio_init_callback(&pin6_encoder_cb_data, MotorEncoder::encoder_pin6_edge_rising, BIT(pin6_encoder_spec.pin));
        gpio_add_callback(pin6_encoder_spec.port, &pin6_encoder_cb_data);
    }
    
    ~MotorEncoder() {
        gpio_remove_callback(pin5_encoder_spec.port, &pin5_encoder_cb_data);
        gpio_remove_callback(pin6_encoder_spec.port, &pin6_encoder_cb_data);
    }
    
    int get_angle() {
        return angle;
    }
    
    void reset_angle() {
        angle = 0;
    }
    
    int get_target_angle() {
        return target_angle;
    }
    
    void set_target_angle(int target_angle) {
        this->target_angle = target_angle;
    }
    
private:
    gpio_dt_spec pin5_encoder_spec;
    gpio_dt_spec pin6_encoder_spec;
    struct gpio_callback pin5_encoder_cb_data;
    struct gpio_callback pin6_encoder_cb_data;
    volatile int angle;
    int target_angle;
    bool expect_pin5_int;
    bool expect_pin6_int;
};

MotorEncoder encoder(specs[51], specs[50]);

def_prim(drive_motor_degrees, twoToNoneU32) {
    int32_t speed = (int32_t) arg0.uint32;
    int32_t degrees = (int32_t) arg1.uint32;
    printf("drive_motor_degrees(%d, %d)\n", speed, degrees);
    
    gpio_dt_spec pin5_encoder_spec = specs[51];
    gpio_dt_spec pin6_encoder_spec = specs[50];
    /*uint8_t old_res5 = gpio_pin_get_raw(pin5_encoder_spec.port, pin5_encoder_spec.pin);
    uint8_t old_res6 = gpio_pin_get_raw(pin6_encoder_spec.port, pin6_encoder_spec.pin);*/
    
    //MotorEncoder encoder(pin5_encoder_spec, pin6_encoder_spec);
    encoder.set_target_angle(encoder.get_target_angle() + degrees);
    
    //drive_motor(speed / 10000.0f);
    
    /*int count = 0;
    while (count < arg1.uint32) {
        uint8_t res5 = gpio_pin_get_raw(pin5_encoder_spec.port, pin5_encoder_spec.pin);
        //printf("previous = %d, current = %d\n", old_res5, res5);
        if (res5 != old_res5 && old_res5 == 0) { // Rising event
            printk("Software rising edge detected on encoder\n");
            count++;
        }
        old_res5 = res5;
        
        uint8_t res6 = gpio_pin_get_raw(pin6_encoder_spec.port, pin6_encoder_spec.pin);
        if (res6 != old_res6 && old_res6 == 0) {
            printk("Software rising edge detected on encoder\n");
            count++;
        }
        old_res6 = res6;
    }*/
    
    //while (abs(encoder.get_angle() - start_angle) < arg1.uint32) {}
    
    //drive_pwm(1.0f, 1.0f);
    
    //k_msleep(50);
    
    printk("drift = %d\n", abs(encoder.get_angle() - encoder.get_target_angle()));
    
    // Test drift correction:
    /*drive_motor(-speed / 10000.0f);
    while (abs(encoder.get_angle() - start_angle) - arg1.uint32 > 0) {}
    drive_pwm(1.0f, 1.0f);
    k_msleep(100);
    printk("drift = %d\n", abs(encoder.get_angle() - start_angle) - arg1.uint32);*/
    
    int drift = encoder.get_angle() - encoder.get_target_angle();
    while (abs(drift) > 0) {
        int speed_sign = std::signbit(drift) ?  -1 : 1;
        drive_motor(speed_sign * speed / 10000.0f);
        while (speed_sign * (encoder.get_angle() - encoder.get_target_angle()) > 0) {}
        drive_pwm(1.0f, 1.0f);
        k_msleep(50);
        drift = encoder.get_angle() - encoder.get_target_angle();
        printk("drift = %d\n", drift);
    }
    
    pop_args(2);
    return true;
}

//------------------------------------------------------
// Installing all the primitives
//------------------------------------------------------
void install_primitives() {
    dbg_info("INSTALLING PRIMITIVES\n");
    install_primitive(chip_delay);
    install_primitive(chip_pin_mode);
    install_primitive(chip_digital_write);
    install_primitive(chip_digital_read);
    install_primitive(print_int);
    install_primitive(motor_test);
    install_primitive(drive_motor_for_ms);
    install_primitive(drive_motor_degrees);
}

//------------------------------------------------------
// resolving the primitives
//------------------------------------------------------
bool resolve_primitive(char *symbol, Primitive *val) {
    debug("Resolve primitives (%d) for %s  \n", ALL_PRIMITIVES, symbol);

    for (auto &primitive : primitives) {
        //        printf("Checking %s = %s  \n", symbol, primitive.name);
        if (!strcmp(symbol, primitive.name)) {
            debug("FOUND PRIMITIVE\n");
            *val = primitive.f;
            return true;
        }
    }
    FATAL("Could not find primitive %s \n", symbol);
    return false;
}

//Memory external_mem = {0, 0, 0, nullptr};

bool resolve_external_memory(char *symbol, Memory **val) {
    /*if (!strcmp(symbol, "memory")) {
        if (external_mem.bytes == nullptr) {
            external_mem.initial = 256;
            external_mem.maximum = 256;
            external_mem.pages = 256;
            external_mem.bytes = (uint8_t *)acalloc(
                external_mem.pages * PAGE_SIZE, sizeof(uint32_t),
                "Module->memory.bytes primitive");
        }
        *val = &external_mem;
        return true;
    }*/

    FATAL("Could not find memory %s \n", symbol);
    return false;
}

#endif  // ARDUINO
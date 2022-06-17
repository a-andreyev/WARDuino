#pragma once

#include <unistd.h>

#include <cstdint>

#include "../WARDuino.h"

typedef struct {
    int csp;
    int sp;
    uint8_t *pc_ptr;
    RunningState program_state;
} ExecutionState;

class Proxy {
   private:
    // short unsigned serializationSize;
    struct SerializeData {
        const unsigned char *raw;
        uint32_t size;
    };

    struct SerializeData *serializeRFC();
    struct SerializeData *serializeRFCallee();
    void deserializeRFCResult();

   public:
    const uint32_t fid;
    StackValue *args;
    const Type *type;
    StackValue *result;
    bool succes;
    char *exceptionMsg;
    uint16_t excpMsgSize;
    const ExecutionState *executionState;

    Proxy(uint32_t t_fid, Type *t_type, StackValue *t_args = nullptr,
          ExecutionState *t_exState = nullptr);
    void call(StackValue *args);
    void returnResult(Module *m);
    void restoreExecutionState(Module *m, RunningState *program_state) const;
    bool callCompleted(Module *m) const;

    // Client side
    static Proxy *registerRFC(uint32_t t_fid, Type *t_type);
    static void registerRFCs(Module *m, uint8_t **data);
    static void unregisterRFC(uint32_t fid);
    static bool isRFC(uint32_t fid);
    static Proxy *getRFC(uint32_t fid);
    static void clearRFCs();

    // Server side
    static Proxy *registerRFCallee(uint32_t t_fid, Type *t_type,
                                   StackValue *t_args,
                                   ExecutionState *t_executionState);
    static bool hasRFCallee();
    static Proxy *currentCallee();
    static void removeRFCallee();
    static StackValue *readRFCArgs(Block *func, uint8_t *data);
    static void setupCalleeArgs(Module *m, Proxy *callee);
};

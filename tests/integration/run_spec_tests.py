#!/usr/bin/env python3

# run_spec_tests.py
#
# Runs all WebAssembly Core Spec tests for WARDuino.
#
# Requirements:
#   command to translate WebAssembly text format to the WebAssembly binary format (default: wat2wasm)
#   TESTWARDuino executable (build cmake project in root)
#
# Author: Tom Lauwaerts

import argparse
import os
import shutil
import subprocess


class TestsuiteStatistics:
    def __init__(self):
        self.total = 0
        self.skipped = 0
        self.failed = 0
        self.crashed = 0
        self.success = 0
        self.results = []

    def testsuite_pass(self):
        return self.success == self.total

    def __str__(self):
        individual_passed_tests = sum([result.passed_tests for result in self.results])
        individual_tests = sum([result.total_tests for result in self.results])
        individual_percentage = (individual_passed_tests / individual_tests) * 100

        files_mark = "\u2714" if self.success / self.total == 1.0 else "\u274C"
        individual_mark = "\u2714" if individual_percentage == 100 else "\u274C"
        return "\nTESTSUITE RESULTS:\n==================\n" \
               + f"total: {self.total}, skipped: {self.skipped}, failed: {self.failed}, " \
               + f"crashed: {self.crashed}, success: {self.success}\n\n" \
               + f"{files_mark} {self.success}/{self.total} testfiles passed completely.\n" \
               + f"{individual_mark} {individual_passed_tests}/{individual_tests}" \
               + f" (~{individual_percentage:.2f}%) individual tests passed.\n"


class TestResults:

    def __init__(self, name, completion):
        self.name = name
        self.stderr = completion.stderr
        self.return_code = completion.returncode
        self.passed_tests = completion.stdout.count(b'OK')
        self.failed_tests = completion.stdout.count(b'FAIL')
        self.total_tests = completion.stdout.count(b'assert')
        self.crashed_tests = self.total_tests - (self.passed_tests + self.failed_tests)

    def __str__(self):
        mark = "\u274C" if self.return_code != 0 else "\u2714"
        string_representation = f"{mark} "
        if self.crashed_tests != 0:
            string_representation += f"(crashed with: exit {self.return_code})"
        elif self.total_tests > 0:
            string_representation += f"{self.passed_tests}/{self.total_tests} passed"
        elif self.return_code != 0:
            string_representation += f"(crashed with: exit {self.return_code})"
        else:
            string_representation += f"passed (0 tests)"
        if args.verbose and len(self.stderr) > 0:
            string_representation += "\n"
            string_representation += self.stderr.decode("utf-8")
        return string_representation.rstrip()


def main(test_directory):
    if test_directory[-1] != "/":
        test_directory += "/"
    # Create temporary directory
    tmp_directory = test_directory + ".tmp/"
    if not os.path.exists(tmp_directory):
        os.mkdir(tmp_directory)

    tests = [filename for filename in os.listdir(test_directory) if filename.endswith(".wast")]

    stats = TestsuiteStatistics()
    # For each test file in the test directory
    print(f"""RUNNING TESTSUITE:\n==================\n""")
    for filename in tests:
        tabs = '\t' * (7 - (len(filename)//4))
        print(f"""{filename}{tabs}""".expandtabs(4), end="")
        stats.total += 1

        base_name = tmp_directory + os.path.splitext(filename)[0]
        modules_file = open(base_name + "_modules.wast", "w")
        asserts_file = open(base_name + "_asserts.wast", "w")

        file = modules_file
        module = False
        failed = False
        for line in open(test_directory + filename, "r"):
            if line.startswith("(module"):
                if module:
                    print(f"\u274C (has multiple modules)""", end="")  # WARDuino doesn't support this yet. Is skipped.
                    failed = True
                    break

                file = modules_file
                module = True
            elif line.startswith("(assert"):
                file = asserts_file

            if not line.startswith(";;"):
                file.write(line)

        modules_file.close()
        asserts_file.close()

        if not failed:
            try:
                completion = subprocess.run([args.interpreter, modules_file.name, asserts_file.name, args.compiler],
                                            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                test_results = TestResults(filename, completion)
                stats.results.append(test_results)
                if completion.returncode == 0:
                    stats.success += 1
                elif completion.returncode == 2:
                    stats.failed += 1
                else:
                    stats.crashed += 1
                print(test_results, end="")
            except subprocess.CalledProcessError:
                pass
        else:
            stats.skipped += 1

        print("")

    print(stats)
    if args.verbose:
        print("Passed files:")
        for passed_test in stats.results:
            print(f"""\t{passed_test.name}""")

    # Remove temporary files
    try:
        shutil.rmtree(tmp_directory)
    except OSError as e:
        print("Error: %s - %s." % (e.filename, e.strerror))

    exit(int(not stats.testsuite_pass()))


if __name__ == '__main__':
    # Args handling
    parser = argparse.ArgumentParser()
    parser.add_argument("--interpreter", default="../../cmake-build-debug/TestWARDuino", help="Interpreter")
    parser.add_argument("--compiler", default="wat2wasm", help="WebAssembly text format compiler (default: wat2wasm)")
    parser.add_argument("--verbose", default=False, help="Verbose output (default: False)")

    args = parser.parse_args()

    main("core/")

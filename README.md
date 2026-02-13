🧮 Logic-First Calculator
A robust, browser-based calculator built with vanilla JavaScript, focusing on complex state management and a "bulletproof" user experience. This project was developed as part of the The Odin Project curriculum.

🚀 Features
Core Operations: Support for Addition, Subtraction, Multiplication, Division, and Modulo.

Chained Calculations: Evaluates pairs of numbers immediately when a new operator is pressed (e.g., 12 + 7 - results in 19 on the screen, ready for the next number).

Intelligent Input Guards:

Operator Swapping: If you click + then immediately change your mind to -, the calculator swaps the operator without breaking the logic.

Fresh Start: After hitting =, typing a new number automatically clears the previous result and starts a new calculation.

Result Continuation: After hitting =, pressing an operator allows you to use the result as the starting point for your next math step.

Decimal Support: Full floating-point math capability with a "one decimal per number" restriction.

Safety Features:

Snarky error handling for division by zero.

Input sanitization to prevent NaN errors.

"Backspace" (Clear Last) and "All Clear" (AC) functionality.

🛠️ Technical Logic
The "brain" of this calculator uses a State Machine approach to handle user inputs:

The Janitor Logic: A specialized guard clause at the start of the input handler that detects if a result is currently displayed. It decides whether to "clean the house" (reset for a new number) or "continue the chain" (use the result for more math).

Immutability & Parsing: All inputs are stored as strings to prevent precision issues during entry, then surgically parsed using parseFloat only at the moment of calculation.

UI/UX Synchronization: A dedicated updateDisplay function ensures that the internal variables (the "brain") and the DOM (the "eyes") stay perfectly in sync, even during complex "backspace" or "operator swap" operations.

🧪 Requirements Met
[x] Operate Function: Centralized math logic using a switch statement.

[x] Rounding: Prevents display overflow for long decimal results.

[x] Zero Division Guard: Custom UI message for illegal operations.

[x] Consecutive Operators: Replaces the previous operator instead of evaluating prematurely.

[x] Decimal Guard: Logic to prevent 12.3.56.5.

🖥️ Preview
"A calculator is only as good as its edge cases."
https://mrbeamer.github.io/odin-calculator/

This project successfully handles the "The Odin Project" challenge of preventing the calculator from evaluating until two numbers are present, while maintaining a smooth, "iPhone-style" user experience for chaining math.
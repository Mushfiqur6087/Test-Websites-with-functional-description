# Parabank Functional Overview

**Website URL:** [https://parabank.parasoft.com/parabank/index.htm](https://parabank.parasoft.com/parabank/index.htm)

**Navigation:** Parabank is a sample banking application provided by Parasoft for testing purposes. When visitors arrive, they see the sign-in page, which offers an Email / Username and Password form, a Register link for new customers, and a Forgot Password? link for credential recovery. After a successful log-in, users reach their account dashboard displaying every account and balance. A left-hand navigation menu now contains the following options: Accounts Overview (default dashboard view), Open New Account, Transfer Funds, Bill Pay, Request Loan, Update Contact Info, and Log Out.

## 1. Login
![Login](1_login.png)
The login page displays the ParaBank header and primary navigation links (Solutions, About Us, Services, Products, Locations, Admin Page) on the left and quick-access icons (Home, Profile, Messages) at the top. Below that is the Customer Login form with two text inputs—Username (or Email) and Password—and a Log In button. Directly beneath the button are the “Forgot login info?” link and a “Register” link for new users. When the user clicks Log In, the system submits the credentials to the server. If they match a registered account, the user is immediately taken to their account dashboard. If they do not match (or any error occurs during authentication), the same error banner “An internal error has occurred and has been logged. Please try again later.” is shown, both input fields remain populated, and the user can correct their entry and click Log In again.

## 2. Forgot Password
![Forgot Password](2_forget.png)
The Forgot Login Info page displays the ParaBank header and primary navigation links (Solutions, About Us, Services, Products, Locations, Admin Page) alongside the Home, Profile and Messages icons. The left sidebar contains the Customer Login form with Username and Password fields, a Log In button, and links for “Forgot login info?” and “Register.” The main content area presents a Customer Lookup form with seven required fields—First Name, Last Name, Address, City, State, Zip Code and SSN. If any field is left blank, the user is prompted to complete it before submitting. Once all fields are entered and the “Find My Login Info” button is clicked, the system attempts to match the information to a customer record. If no matching record is found, the page displays the error banner:
"Error! The customer information provided could not be found." If a matching record is found, the page displays the appropriate recovery details.

![Forgot Password Error](2_forget_error.png)

## 3. Register
![Sign Up](3_signup.png)
The Register page displays the ParaBank header and primary navigation links (Solutions, About Us, Services, Products, Locations, Admin Page) alongside the Home, Profile and Messages icons. The left sidebar contains the Customer Login form with Username and Password fields, a Log In button, and links for “Forgot login info?” and “Register.” The main content area presents a registration form with eleven fields—First Name, Last Name, Address, City, State, Zip Code, Phone #, SSN, Username, Password and Confirm Password—all of which are mandatory and impose no additional format or content constraints. A Register button submits the form; upon clicking it, the system creates the new account, automatically logs the user in, and displays “Your account was created successfully. You are now logged in."


## 4. Open New Account
![Open New Account](4_newAccount.png)
The Open New Account page displays the ParaBank header and primary navigation links (Solutions, About Us, Services, Products, Locations, Admin Page) alongside the Home, Profile and Messages icons. The left sidebar is titled Account Services and lists all available actions—Open New Account, Accounts Overview, Transfer Funds, Bill Pay, Find Transactions, Update Contact Info, Request Loan and Log Out—with Open New Account highlighted. The main content area presents a form where the user selects the account type (Savings or Checking) from a dropdown, then chooses one of their existing accounts as the funding source for the required $100.00 opening deposit. Clicking Open New Account deducts $100.00 from the selected source account and attempts to create the new account. If all validations succeed, it debits the source account, credits the new account, generates a unique account number, and displays “Account created successfully.” along with the new account number and the page displays: "Account Opened! Congratulations, your account is now open. Your new account number: [account number]".

![New Account Success](4_newAccount_success.png)


## My Account
![My Account](5_myAccount.png)
The Accounts Overview page displays the ParaBank header and primary navigation links (Solutions, About Us, Services, Products, Locations, Admin Page) alongside the Home, Profile and Messages icons. The left sidebar, titled Account Services, lists all actions—Open New Account, Accounts Overview, Transfer Funds, Bill Pay, Find Transactions, Update Contact Info, Request Loan and Log Out—with Accounts Overview highlighted. The main content area opens with the heading “Accounts Overview” above a table showing every account owned by the customer. Each row presents the account number alongside its current Balance and Available Amount. At the bottom of the table, the combined total balance across all accounts is shown.

## 6. Transfer Funds
![Transfer Funds](6_transferFunds.png)
The Transfer Funds page displays the ParaBank header and primary navigation links (Solutions, About Us, Services, Products, Locations, Admin Page) alongside the Home, Profile and Messages icons. The left sidebar, titled Account Services, lists all actions—Open New Account, Accounts Overview, Transfer Funds, Bill Pay, Find Transactions, Update Contact Info, Request Loan and Log Out—with Transfer Funds highlighted. The main content area opens with the heading “Transfer Funds” above a form containing an Amount field and two dropdowns labeled From account # and To account # for selecting existing accounts. After the user enters a value and selects both source and destination accounts and clicks Transfer, the page displays: "Transfer Complete! amount has been transferred from account _ to account _.See Account Activity for more details."














## 7. Bill payments
![Bill Payment](8_billPayment.png)
 The bill-payment page contains a payment form with required inputs for Payee Name, Street Address, City, State, ZIP Code, Phone Number, Payee Account Number plus a Confirm Account Number field, Payment Amount, and a Source Account drop-down, finished by a “Pay” button. On submission, the system validates each entry for presence and format, confirms that the two account-number fields match, verifies that the selected source account holds sufficient available funds, and then executes the payment to the external payee. If all checks pass, it displays “Payment submitted successfully.” along with a transaction reference and updates the account balance; if any validation or balance check fails, it shows a clear error message such as “Insufficient funds” or “Account numbers do not match,” highlights the problematic fields, and lets the user correct and resubmit.

## 8. Find Transaction
![Find Transaction](9_findTransaction.png)
 The transaction search page allows users to find specific transactions by entering criteria such as date range, amount, or description. Matching results are displayed in a list for review. If no transactions are found, a message is shown to the user.

## 9. Update Profile
![Update Profile](10_updateProfile.png)
 The customer-profile page presents an editable form pre-populated with the user’s current First Name, Last Name, Street Address, City, State, ZIP Code, and Phone Number, along with an “Update Profile” button. When the user edits any field and submits, the system validates each entry—checking, for example, that the phone number matches the required format and that all address components are complete and logically consistent—then saves the changes and synchronizes them across all relevant services. If every check passes, it displays “Profile updated successfully.” and refreshes the page to show the new data; otherwise it highlights any invalid fields, shows an inline error banner explaining what needs fixing, and allows the user to correct and resubmit.

## 10. Request Loan
![Loan Application](11_loan.png)
 The loan-application page presents a loan request form requiring the customer to enter the Loan Amount, specify a Down-Payment Amount (which must be numerically less than the loan amount), choose a Collateral Account from a dropdown of eligible accounts, and press “Apply”. Upon submission, the system checks every field for completeness and correct numeric format, verifies that sufficient funds exist to cover the down payment, confirms the collateral account’s value meets policy thresholds, and then runs an automated credit evaluation that factors in the customer’s account history, current balances, and collateral valuation. If the application qualifies, the system debits the down-payment funds, earmarks the collateral, creates a new loan account, and displays “Loan approved and created successfully.” along with the account number, disbursement schedule, and repayment terms; if the request is denied, it returns “Loan application denied” followed by specific reasons (e.g., “Insufficient collateral value” or “Account history does not meet criteria”) and allows the customer to adjust inputs or contact support.

 ## Logout
 The logout function securely ends the user session, clears any sensitive data from the session, and returns the user to the login page. This ensures that no account information remains accessible after logout.

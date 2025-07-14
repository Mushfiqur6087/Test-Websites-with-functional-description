import { useState } from "react";
import { CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const mockAccounts = [
  { id: "123456789", name: "Checking Account (****6789)", balance: 2847.52 },
  { id: "123456790", name: "Savings Account (****6790)", balance: 15678.90 },
];

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function BillPay() {
  const [formData, setFormData] = useState({
    payeeName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    payeeAccount: "",
    payeeAccountConfirm: "",
    paymentAmount: "",
    sourceAccount: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.payeeName.trim()) newErrors.payeeName = "Payee name is required";
    if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.payeeAccount.trim()) newErrors.payeeAccount = "Payee account number is required";
    if (!formData.payeeAccountConfirm.trim()) newErrors.payeeAccountConfirm = "Please confirm account number";
    if (!formData.paymentAmount || parseFloat(formData.paymentAmount) <= 0) {
      newErrors.paymentAmount = "Please enter a valid payment amount";
    }
    if (!formData.sourceAccount) newErrors.sourceAccount = "Please select a source account";

    // ZIP code validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code";
    }

    // Phone validation
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone must be in format (123) 456-7890";
    }

    // Account number match validation
    if (formData.payeeAccount !== formData.payeeAccountConfirm) {
      newErrors.payeeAccountConfirm = "Account numbers do not match";
    }

    // Sufficient funds validation
    const sourceAccount = mockAccounts.find(acc => acc.id === formData.sourceAccount);
    if (sourceAccount && parseFloat(formData.paymentAmount) > sourceAccount.balance) {
      newErrors.paymentAmount = "Insufficient funds in source account";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const referenceCode = Math.random().toString(36).substr(2, 9).toUpperCase();
      toast({
        title: "Payment submitted successfully",
        description: `Reference Code: ${referenceCode}`,
      });
      
      // Reset form
      setFormData({
        payeeName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        payeeAccount: "",
        payeeAccountConfirm: "",
        paymentAmount: "",
        sourceAccount: "",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground">Bill Pay</h1>
        <p className="text-muted-foreground">Pay your bills securely online</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payee Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payee Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="payeeName">Payee Name</Label>
                <Input
                  id="payeeName"
                  name="payeeName"
                  required
                  value={formData.payeeName}
                  onChange={handleInputChange}
                  placeholder="Enter payee name"
                  className={errors.payeeName ? "border-destructive" : ""}
                />
                {errors.payeeName && (
                  <p className="text-sm text-destructive">{errors.payeeName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  required
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                  className={errors.streetAddress ? "border-destructive" : ""}
                />
                {errors.streetAddress && (
                  <p className="text-sm text-destructive">{errors.streetAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, state: value })}>
                    <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-sm text-destructive">{errors.state}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    className={errors.zipCode ? "border-destructive" : ""}
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-destructive">{errors.zipCode}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setFormData({ ...formData, phoneNumber: formatted });
                  }}
                  placeholder="(123) 456-7890"
                  className={errors.phoneNumber ? "border-destructive" : ""}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payeeAccount">Payee Account Number</Label>
                  <Input
                    id="payeeAccount"
                    name="payeeAccount"
                    required
                    value={formData.payeeAccount}
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                    className={errors.payeeAccount ? "border-destructive" : ""}
                  />
                  {errors.payeeAccount && (
                    <p className="text-sm text-destructive">{errors.payeeAccount}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payeeAccountConfirm">Confirm Account Number</Label>
                  <Input
                    id="payeeAccountConfirm"
                    name="payeeAccountConfirm"
                    required
                    value={formData.payeeAccountConfirm}
                    onChange={handleInputChange}
                    placeholder="Re-enter account number"
                    className={errors.payeeAccountConfirm ? "border-destructive" : ""}
                  />
                  {errors.payeeAccountConfirm && (
                    <p className="text-sm text-destructive">{errors.payeeAccountConfirm}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentAmount">Payment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="paymentAmount"
                      name="paymentAmount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      value={formData.paymentAmount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className={`pl-8 ${errors.paymentAmount ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.paymentAmount && (
                    <p className="text-sm text-destructive">{errors.paymentAmount}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sourceAccount">Source Account</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, sourceAccount: value })}>
                    <SelectTrigger className={errors.sourceAccount ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select source account" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{account.name}</span>
                            <span className="text-muted-foreground ml-4">
                              {formatCurrency(account.balance)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sourceAccount && (
                    <p className="text-sm text-destructive">{errors.sourceAccount}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Processing Information */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Bill payments typically process within 1-2 business days. You will receive email confirmation once the payment is sent.
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover"
              disabled={isLoading}
            >
              {isLoading ? "Processing Payment..." : "Pay Bill"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      {formData.paymentAmount && formData.sourceAccount && formData.payeeName && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payee:</span>
                <span className="font-semibold">{formData.payeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold">{formatCurrency(parseFloat(formData.paymentAmount) || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">From Account:</span>
                <span>{mockAccounts.find(acc => acc.id === formData.sourceAccount)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Time:</span>
                <span>1-2 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee:</span>
                <span className="text-success">$0.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
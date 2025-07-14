import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, PlusCircle, ArrowLeftRight, CreditCard, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock account data
const mockAccounts = [
  {
    id: "123456789",
    type: "Checking",
    balance: 2847.52,
    accountNumber: "****6789",
  },
  {
    id: "123456790",
    type: "Savings",
    balance: 15678.90,
    accountNumber: "****6790",
  },
  {
    id: "123456791",
    type: "Credit Card",
    balance: -1234.56,
    accountNumber: "****6791",
  },
];

// Mock recent transactions
const mockTransactions = [
  {
    id: "1",
    description: "Direct Deposit - Salary",
    amount: 3500.00,
    date: "2024-01-15",
    type: "credit",
  },
  {
    id: "2",
    description: "Online Purchase - Amazon",
    amount: -87.45,
    date: "2024-01-14",
    type: "debit",
  },
  {
    id: "3",
    description: "Transfer to Savings",
    amount: -500.00,
    date: "2024-01-13",
    type: "transfer",
  },
  {
    id: "4",
    description: "ATM Withdrawal",
    amount: -60.00,
    date: "2024-01-12",
    type: "debit",
  },
];

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);

  const totalBalance = mockAccounts
    .filter(account => account.type !== "Credit Card")
    .reduce((sum, account) => sum + account.balance, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accounts Overview</h1>
          <p className="text-muted-foreground">Welcome back to your ParaBank dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Balances
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Balances
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm">Total Balance</p>
              <p className="text-3xl font-bold">
                {showBalance ? formatCurrency(totalBalance) : "••••••"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-primary-foreground/80 text-sm">Last Updated</p>
              <p className="text-primary-foreground">Just now</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/open-account">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <PlusCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Open New Account</h3>
              <p className="text-sm text-muted-foreground">Start earning with a new account</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/transfer">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <ArrowLeftRight className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Transfer Funds</h3>
              <p className="text-sm text-muted-foreground">Move money between accounts</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/bill-pay">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Bill Pay</h3>
              <p className="text-sm text-muted-foreground">Pay your bills online</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Account Number</th>
                  <th className="text-left py-3 px-4 font-semibold">Account Type</th>
                  <th className="text-right py-3 px-4 font-semibold">Current Balance</th>
                  <th className="text-center py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAccounts.map((account) => (
                  <tr key={account.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <Link
                        to={`/account/${account.id}`}
                        className="text-primary hover:text-primary-hover font-medium"
                      >
                        {account.accountNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-4">{account.type}</td>
                    <td className="py-3 px-4 text-right font-mono">
                      <span className={
                        account.balance < 0 
                          ? "text-destructive" 
                          : "text-foreground"
                      }>
                        {showBalance 
                          ? (account.balance < 0 ? "-" : "") + formatCurrency(account.balance)
                          : "••••••"
                        }
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className="text-success border-success">
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Total Balance Row */}
          <div className="border-t bg-muted/30 mt-4">
            <div className="flex justify-between items-center py-3 px-4">
              <span className="font-semibold">Total Balance</span>
              <span className="font-semibold font-mono">
                {showBalance ? formatCurrency(totalBalance) : "••••••"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  {transaction.type === "credit" ? (
                    <TrendingUp className="h-5 w-5 text-success" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  )}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-mono font-semibold ${
                    transaction.amount > 0 ? "text-success" : "text-destructive"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link to="/statements">View All Transactions</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
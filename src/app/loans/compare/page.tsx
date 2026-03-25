'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckCircle2, X, ArrowRight } from 'lucide-react'

// Mock data - replace with actual API call
const availableLoans = [
  {
    id: '1',
    bankName: 'SBI MSME Loan',
    interestRate: '8.5% - 10.5%',
    loanAmount: '₹10L - ₹5Cr',
    tenure: '12-60 months',
    processingFee: '1%',
    collateral: 'Required above ₹1Cr',
    approvalTime: '7-10 days',
    features: ['Low interest rates', 'Flexible repayment', 'Government backed'],
  },
  {
    id: '2',
    bankName: 'HDFC Business Loan',
    interestRate: '10.5% - 14%',
    loanAmount: '₹5L - ₹75L',
    tenure: '12-48 months',
    processingFee: '2%',
    collateral: 'Not required',
    approvalTime: '3-5 days',
    features: ['Quick approval', 'No collateral', 'Digital process'],
  },
  {
    id: '3',
    bankName: 'ICICI Bank MSME Loan',
    interestRate: '9.5% - 12%',
    loanAmount: '₹25L - ₹10Cr',
    tenure: '12-84 months',
    processingFee: '1.5%',
    collateral: 'Required',
    approvalTime: '5-7 days',
    features: ['Longer tenure', 'Competitive rates', 'Dedicated RM'],
  },
  {
    id: '4',
    bankName: 'Axis Bank Business Loan',
    interestRate: '11% - 15%',
    loanAmount: '₹1L - ₹50L',
    tenure: '6-36 months',
    processingFee: '2.5%',
    collateral: 'Not required',
    approvalTime: '2-3 days',
    features: ['Instant approval', 'Minimal documentation', 'Flexible EMI'],
  },
]

export default function LoanComparePage() {
  const [selectedLoans, setSelectedLoans] = useState<string[]>([])

  const handleLoanToggle = (loanId: string) => {
    setSelectedLoans(prev =>
      prev.includes(loanId)
        ? prev.filter(id => id !== loanId)
        : prev.length < 4
        ? [...prev, loanId]
        : prev
    )
  }

  const selectedLoanData = availableLoans.filter(loan => selectedLoans.includes(loan.id))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Business Loans
            </h1>
            <p className="text-lg text-gray-600">
              Select up to 4 loans to compare side by side. Find the best rates and terms for your business.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Loan Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Loans to Compare (Max 4)</CardTitle>
            <CardDescription>
              Choose the loans you want to compare. Selected: {selectedLoans.length}/4
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableLoans.map((loan) => (
                <div
                  key={loan.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedLoans.includes(loan.id)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleLoanToggle(loan.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Checkbox
                      checked={selectedLoans.includes(loan.id)}
                      onCheckedChange={() => handleLoanToggle(loan.id)}
                    />
                    {selectedLoans.includes(loan.id) && (
                      <Badge className="bg-orange-500">Selected</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{loan.bankName}</h3>
                  <div className="text-sm text-gray-600">
                    <div>Rate: {loan.interestRate}</div>
                    <div>Amount: {loan.loanAmount}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        {selectedLoanData.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Loan Comparison</CardTitle>
              <CardDescription>
                Compare key features, rates, and terms side by side
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 bg-gray-50">
                        Feature
                      </th>
                      {selectedLoanData.map((loan) => (
                        <th key={loan.id} className="text-left py-4 px-4 font-semibold text-gray-900 bg-gray-50">
                          <div className="flex items-start justify-between">
                            <span>{loan.bankName}</span>
                            <button
                              onClick={() => handleLoanToggle(loan.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium text-gray-700">Interest Rate</td>
                      {selectedLoanData.map((loan) => (
                        <td key={loan.id} className="py-4 px-4">
                          <span className="text-orange-600 font-semibold">{loan.interestRate}</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-700">Loan Amount</td>
                      {selectedLoanData.map((loan) => (
                        <td key={loan.id} className="py-4 px-4">
                          <span className="font-semibold">{loan.loanAmount}</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium text-gray-700">Tenure</td>
                      {selectedLoanData.map((loan) => (
                        <td key={loan.id} className="py-4 px-4">{loan.tenure}</td>
                      ))}
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-700">Processing Fee</td>
                      {selectedLoanData.map((loan) => (
                        <td key={loan.id} className="py-4 px-4">{loan.processingFee}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium text-gray-700">Collateral</td>
                      {selectedLoanData.map((loan) => (
                        <td key={loan.id} className="py-4 px-4">{loan.collateral}</td>
                      ))}
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-700">Approval Time</td>
                      {selectedLoanData.map((loan) => (
                        <td key={loan.id} className="py-4 px-4">
                          <Badge variant="outline">{loan.approvalTime}</Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4 font-medium text-gray-700 align-top">Key Features</td>
                      {selectedLoanData.map((loan) => (
                        <td key={loan.id} className="py-4 px-4">
                          <ul className="space-y-1">
                            {loan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-gray-700">Action</td>
                      {selectedLoanData.map((loan) => (
                        <td key={loan.id} className="py-4 px-4">
                          <Button asChild className="w-full bg-orange-500 hover:bg-[#ea580c]">
                            <Link href={`/loans/${loan.id}`}>View Details</Link>
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 mb-4">
                Select at least one loan to start comparing
              </p>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">Need Help Deciding?</CardTitle>
              <CardDescription className="text-orange-100">
                Get personalized loan recommendations based on your business profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-white text-orange-600 hover:bg-gray-100">
                <Link href="/eligibility-checker">
                  Check Eligibility
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Talk to an Expert</CardTitle>
              <CardDescription>
                Get free consultation from verified loan consultants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/consultants">
                  Find Consultants
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

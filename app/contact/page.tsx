"use client"

import React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToastContext } from "@/lib/toast-context"

export default function ContactPage() {
  const { showToast } = useToastContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // TODO: Backend integration - Send contact form data
    // await sendContactForm(formData)
    
    setIsSubmitting(false)
    showToast("Message sent successfully! We will get back to you soon.", "success")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our puja packages? Need help with an order? We are here to help!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">+91 98765 43210</p>
                <p className="text-sm text-muted-foreground">
                  Mon-Sat: 9:00 AM - 8:00 PM
                </p>
                <p className="text-sm text-muted-foreground">
                  Sunday: 10:00 AM - 6:00 PM
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">support@pujasamagri.com</p>
                <p className="text-sm text-muted-foreground">
                  We reply within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">+91 98765 43210</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Quick responses on WhatsApp
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                >
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Office Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">PujaSamagri Pvt. Ltd.</p>
                <p className="text-muted-foreground">
                  123 Temple Street, Dashashwamedh Ghat
                </p>
                <p className="text-muted-foreground">
                  Varanasi, Uttar Pradesh 221001
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order Related</SelectItem>
                          <SelectItem value="delivery">Delivery Issue</SelectItem>
                          <SelectItem value="product">Product Inquiry</SelectItem>
                          <SelectItem value="refund">Refund Request</SelectItem>
                          <SelectItem value="bulk">Bulk Order</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      required
                      placeholder="How can we help you?"
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      q: "How can I track my order?",
                      a: "You can track your order from the 'My Orders' section in your account. You will also receive tracking updates via SMS and email.",
                    },
                    {
                      q: "What is your return policy?",
                      a: "We offer a 7-day return policy for unused items. For perishable items, please contact us within 24 hours of delivery.",
                    },
                    {
                      q: "Do you deliver to all pin codes?",
                      a: "We currently deliver to 500+ cities across India. Enter your pin code at checkout to check availability.",
                    },
                    {
                      q: "Can I get a bulk order discount?",
                      a: "Yes! For orders of 10+ packages, contact us at bulk@pujasamagri.com for special pricing.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <h4 className="font-semibold mb-1">{faq.q}</h4>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

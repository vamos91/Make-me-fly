require 'test_helper'

class PaymentMailerTest < ActionMailer::TestCase
  test "payment_confirmation" do
    mail = PaymentMailer.payment_confirmation
    assert_equal "Payment confirmation", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end

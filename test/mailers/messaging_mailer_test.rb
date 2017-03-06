require 'test_helper'

class MessagingMailerTest < ActionMailer::TestCase
  test "messaging" do
    mail = MessagingMailer.messaging
    assert_equal "Messaging", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end

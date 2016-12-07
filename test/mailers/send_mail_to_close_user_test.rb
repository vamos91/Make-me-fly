require 'test_helper'

class SendMailToCloseUserTest < ActionMailer::TestCase
  test "send_creation_ad_to_users" do
    mail = SendMailToCloseUser.send_creation_ad_to_users
    assert_equal "Send creation ad to users", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end

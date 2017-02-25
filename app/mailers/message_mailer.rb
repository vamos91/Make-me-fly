class MessageMailer < ApplicationMailer
  def message(conversation)
    @conversation = conversation
    mail to: @conversation.recipient_id.email, subjet: "MakeMeFly : Vous avez recus un message de #{@conversation.sender_id.name}"
  end
end

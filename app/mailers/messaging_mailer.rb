class MessagingMailer < ApplicationMailer
  def messaging(message)
    conversation = Conversation.find(message.conversation_id)
    @body_message = message.body
    binding.pry
    @sender = User.find(conversation.sender_id)
    @recipient = User.find(conversation.recipient_id)
    mail(to: @recipient.email, subject: "MakeMeFly : Vous avez recus un message de #{@sender.name}")
  end
end



class MessagesController < ApplicationController

  before_action do
   @conversation = Conversation.find(params[:conversation_id])
   authorize @conversation
  end

def index
 #@messages = @conversation.messages
 @messages = policy_scope(@conversation.messages)
 authorize @messages

  # if @messages.length > 10
  #  @over_ten = true
  #  @messages = @messages[-10..-1]
  #  # authorize @messages
  # end
  if params[:m]
   @over_ten = false
   @messages = @conversation.messages
   authorize @messages
  end

 if @messages.last
  if @messages.last.user_id != current_user.id
   message = @messages.last
   message.read = true
   message.save
  end
 end
@message = @conversation.messages.new
authorize @message
 end


def new
 @message = @conversation.messages.new
 authorize @message
end

def create
 @message = @conversation.messages.new(message_params)
 authorize @message
 if @message.save
  MessagingMailer.messaging(@message).deliver_now
  redirect_to conversation_messages_path(@conversation)
 end
end


private
 def message_params
  params.require(:message).permit(:body, :user_id)
 end
end


 # if @messages
 #  @messages.each do |message|
 #    if @messages.last.user_id != current_user.id
 #      message.read = true
 #      message.save
 #    end
 #  end
 # end

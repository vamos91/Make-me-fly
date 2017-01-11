class ConversationsController < ApplicationController
 #before_action :authenticate_user!

def index
 #@ads = Ad.all
 #find_conversation
 @users = User.all
 #@ad = Ad.find(12)
 conversations = Conversation.all
 @conversations = policy_scope(conversations)
 @conversation_count = Conversation.where(ad_id: @ad.id)
 authorize @conversations
end

def new
  find_conversation
  current_user.conversations.build
end


def create
 if Conversation.between(params[:sender_id],params[:recipient_id])
   .present?
    @conversation = Conversation.between(params[:sender_id],
     params[:recipient_id]).first
    authorize @conversation
 else
  @conversation = Conversation.create!(conversation_params)
  authorize @conversation
 end
 redirect_to conversation_messages_path(@conversation)
end



# def destroy
#    find_conversation
#    @conversation.destroy
#    redirect_to conversations_path
# end

private
 def conversation_params
  params.permit(:sender_id, :recipient_id, :ad_id)
 end

 def find_conversation
   @conversation = Conversation.find(params[:id])
    authorize @conversation
 end



end

class UsersController < ApplicationController
 # before_action :set_article

 def index
  @userPilotes = User.where(pilote: true)
  authorize @userPilotes
  @ads = policy_scope(Ad)
  authorize @ads
 end



 def user_ads
   find_user
   @user_ads = Ad.where(user_id: @user)
   if @user_ads.empty?
    redirect_to user_path, notice: "#{@user.name.capitalize} n'a aucun vol"
   end
   authorize @user
 end

 def chat_user
  find_user
  authorize @user
  @conversations = Conversation.where(recipient_id: @user.id, sender_id: current_user.id)
    if @conversations.empty?
      @conversation = Conversation.new(
        recipient_id: @user.id,
        sender_id: current_user.id
        )
      if @conversation.save
        redirect_to conversation_messages_path(@conversation)
      end
    else
      redirect_to conversation_messages_path(@conversations.first)
    end
 end

 def show
   @ads = policy_scope(Ad)
   authorize @ads
   find_user
   @post = Post.new
   #affiche le nombre de vol du current_user
   @user_ads = Ad.where(user_id: @user)

   @article = current_user.articles.build
   authorize @article


   @user_articles = Article.where(user_id: @user)
   @articles = @user_articles.reverse
   authorize @user_articles
   authorize @user

   @users_near_from_me = User.near(@user.hometown, 100, :units => :km)
 end

 def edit
   @user = User.find(params[:id])
   authorize @user
 end

 def update
   @user = User.find(params[:id])
   authorize @user
   @user.update(user_param)
   if @user.save
    redirect_to user_path(current_user), notice: "Votre profil a été mit à jour"
    else
    render :edit
   end

   def message
    find_user
    @conversations = Conversation.where(recipient_id: @user.id, sender_id: current_user.id)
    if @conversations.empty?
      @conversation = Conversation.new(
        recipient_id: @user.id,
        sender_id: current_user.id
        )
      if @conversation.save
        redirect_to ad_conversation_messages_path(@ad, @conversation)
      end
    else
      redirect_to ad_conversation_messages_path(@ad, @conversations.first)
    end
   end

 end
   private
  def user_param
    params.require(:user).permit(:name, :pilote, :hometown, :picture, :email, :tel, :description, :picture_ulm_user, :pilotevalidation, :assurance, :brevet_pilote, :licence_ulm)
  end

  def find_user
    @user = User.find(params[:id])
  end

  def conversation_params
    params.permit(:sender_id, :recipient_id, :user_id)
  end

  def article_params
    params.permit(:article_id)
  end

  # def set_article
  #   @article = Article.find(params[:article_id])
  # end


end

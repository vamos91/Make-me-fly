class UsersController < ApplicationController
 # before_action :set_article

 def index
  @userPilotes = User.where(pilote: true)
  authorize @userPilotes
  @ads = policy_scope(Ad)
  authorize @ads
 end



 def user_ads
   @user = User.find(params[:id])
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
   find_user
   @post = Post.new
   @article = Article.find(11)
   #affiche le nombre de vol du current_user
   @user_ads = Ad.where(user_id: @user)
   @posts = @article.posts

    # @posts = @article.posts.select do |post|
    #   post.persisted?
    # end

   @user_articles = Article.where(user_id: @user)
   @articles = @user_articles.reverse
   authorize @user_articles

   # @posts = Post.where(article_id: @articles)
   # authorize @posts

   authorize @user
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
    params.require(:user).permit(:name, :pilote, :hometown, :picture, :email, :tel, :description, :picture_ulm_user)
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

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :message_navbar
  before_filter :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception


before_action :authenticate_user!
  include Pundit
  after_action :verify_authorized, except: :index, except: :search, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, except: :search, unless: :skip_pundit?

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  rescue_from ActiveRecord::RecordNotFound do
  flash[:warning] = 'Resource not found.'
  redirect_back_or root_path
  end

  def redirect_back_or(path)
    redirect_to request.referer || path
  end

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(root_path)
  end

  def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:email, :password, :password_confirmation, :name, :pilote, :picture, :hometown) }
  end

  def message_navbar
    if @box.eql? "inbox"
      @conversations = @mailbox.inbox
      @active = :inbox
      authorize @conversations
    elsif @box.eql? "sent"
      @conversations = @mailbox.sentbox
      @active = :sent
      authorize @conversations
    else

    end
    if user_signed_in?
      @messages = current_user.mailbox.inbox({:read => false})
    end
  end

  private

    def skip_pundit?
      devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
    end

    def after_sign_in_path_for(resource)
      if user_signed_in?
       search_ads_path
      end
    end

end

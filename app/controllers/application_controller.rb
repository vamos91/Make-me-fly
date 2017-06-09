class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
    before_filter :configure_permitted_parameters, if: :devise_controller?

  protect_from_forgery with: :exception


before_action :authenticate_user!
  include Pundit

  after_action :verify_authorized, except: :index, except: :search, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, except: :search, unless: :skip_pundit?

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(root_path)
  end

  def configure_permitted_parameters

      #devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:email, :password, :name) }

      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:email, :password, :password_confirmation, :name, :pilote, :picture, :hometown) }

      # devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email, :password, :password_confirmation, :name) }
   # devise_parameter_sanitizer.for(:sign_up) << :user

  end


  private

    def skip_pundit?
      devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
    end

    def after_sign_in_path_for(resource)
      if user_signed_in?
       articles_path
      end
    end

end

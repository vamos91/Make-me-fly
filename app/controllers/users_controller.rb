class UsersController < ApplicationController

 def index
  # users = User.all
  # @pilote = users.pilote
  # authorize @pilote
 end

 def show
   @user = User.find(params[:id])
   authorize @user
   @reviews = @user.reviews
 end




  # private
  # def user_param
  #   params.require(:users).permit(:name, :pilote)
  # end



end

class AdPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user) #j'affiche toutes les annonces du pilote connécté
      #scope.all
    end
  end


  def index?
    true
  end

  def new?
    true
  end

  def create?
    true
  end

  def show?
    true
  end

  def home?
    true
  end

  def booked?
    true
  end

  def unbooked?
    true
  end

  def search?
    true
  end

  def ads?
    true
  end

  def booking_message?
    true
  end

  def update?
   user_is_owner_or_admin?
  end

  def destroy?
    user_is_owner_or_admin?
  end

private

def user_is_owner_or_admin?
  record.user == user
end

def is_user?
    record.user != user
end

end

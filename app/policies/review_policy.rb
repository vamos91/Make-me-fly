class ReviewPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
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

end

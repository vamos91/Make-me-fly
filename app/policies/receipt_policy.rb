class Mailboxer::ReceiptPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def create?
    true
  end

  def show?
   true
  end

  def destroy?
   true
  end

  def restore?
   true
  end

  def reply?
    true
  end

  def empty_trash?
    true
  end

  def mark_as_read?
    true
  end
end

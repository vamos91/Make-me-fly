 module Mailboxer
  class ConversationPolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        scope
      end
    end

    def index?
     true
    end

    def create?
      true
    end

    def get_conversation?
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

    private

    # def user_is_owner_or_admin?
    #   record.user == current_user
    # end
  end
end

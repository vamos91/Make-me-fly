module Mailboxer
  class MessagePolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        scope
      end
    end

    def new?
      true
    end

    def create?
      true
    end
  end
end

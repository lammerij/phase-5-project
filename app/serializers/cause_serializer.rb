class CauseSerializer < ActiveModel::Serializer
  attributes :id, :name, :organization, :description, :number_of_donations, :amount_raised, :amount_needed, :time_remaining
  has_one :organizer
end

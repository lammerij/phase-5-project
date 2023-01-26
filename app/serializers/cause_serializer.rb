class CauseSerializer < ActiveModel::Serializer
  attributes :id, :name, :organization, :description, :number_of_donations, :amount_raised, :amount_needed, :time_remaining
  belongs_to :organizer
  has_many :donations
  has_many :donors, through: :donations
end

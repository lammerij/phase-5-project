class FundraiserSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :cause_id, :donation_id, :number_of_donations, :amount_raised, :amount_needed, :time_remaining
end

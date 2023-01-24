class Fundraiser < ApplicationRecord
    belongs_to :cause
    has_many :donations
    has_many :donors, through: :donations
end

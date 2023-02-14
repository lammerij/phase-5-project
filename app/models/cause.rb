class Cause < ApplicationRecord
  belongs_to :organizer
  has_many :donations
  has_many :donors, through: :donations

  validates :name, presence: true
  validates :organization, presence: true
  validates :description, presence: true
  validates :amount_raised, presence: true
  validates :amount_needed, presence: true
  validates :time_remaining, presence: true
  validates :number_of_donations, presence: true
end

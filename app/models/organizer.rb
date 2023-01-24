class Organizer < User
    has_many :causes
    has_many :fundraisers, through: :causes
end

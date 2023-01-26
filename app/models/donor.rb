class Donor < User
    has_many :donations
    has_many :causes, through: :donations
end

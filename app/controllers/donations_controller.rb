class DonationsController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def index
      donations = Donation.all
      render json: donations
    end
  
    def show
      donations = Donation.find_by(id: params[:id])
      render json: donations
    end
  
    def create
      new_donation = Donation.create!(donation_params)
      new_donation.cause.amount_raised += new_donation.amount
      render json: new_donation.cause.amount_raised, status: :created
    end


    private

    def donation_params
        params.permit(:id, :amount, :cause_id, :donor_id)
    end
end

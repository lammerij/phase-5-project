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
      user = User.find_by(id: session[:user_id])
      new_donation = user.donations.create!(donation_params)
      render json: new_donation, status: :created
    end


    private

    def donation_params
        params.permit(:id, :amount, :cause_id)
    end
end

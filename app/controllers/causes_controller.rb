class CausesController < ApplicationController
  skip_before_action :authorize

  def index
    causes = Cause.all.with_attached_image
    render json: causes
  end

  def show
    causes = Cause.find_by(id: params[:id])
    render json: causes
  end

  def create
    user = User.find_by(id: session[:user_id])
    new_cause = user.causes.create!(cause_params)
    render json: new_cause, status: :created
  end

  private

  def cause_params
    params.permit(:name, :organization, :description, :number_of_donations, :amount_raised, :amount_needed, :time_remaining, :image)
  end
end

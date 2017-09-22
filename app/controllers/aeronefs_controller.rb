class AeronefsController < ApplicationController

  def index
    @aeronef = policy_scope(Aeronef)
  end

  def new
    @aeronef = current_user.aeronefs.build
  end

  def create
    @aeronef = current_user.aeronefs.build(aeronef_params)
    if @aeronef.save
      redirect_to user_path, notice: 'appareil ajouté.'
    end
  end

  def edit
    find_aeronef
  end

  def update
    find_aeronef
    @aeronef.update(aeronef_params)
    if @aeronef.save
      redirect_to user_path, notice: 'Appareil modifié avec succès'
    else
      render :edit
    end
  end

  def destroy
    find_aeronef
    @aeronef.destroy
    redirect_to user_path, notice: 'Appareil effacée avec succès'
  end

  private

  def aeronef_params
    params.require(:aeronef).permit(:nom, :type, :cylindre, :annee, :vitesse, :equipement, :autonomie)
  end

  def find_aeronef
    @aeronef = Aeronef.find(params[:id])
  end

end

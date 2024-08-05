PMF(Project Management Farm)


Technology Stack:

Client (Frontend):

-Frontend Framework: [React]

-Components:

  *Forms for data input.
  
  *Lists to display records.
  
-Communication:

 *Interacts with the backend via RESTful Web services.

-Server (Backend)

-Backend Framework: [Node.js with Express]

- Data Management:
-Supports CRUD operations (Create, Read, Update, Delete) for all records.()

-Data is stored in JSON files.

-API:

RESTful API facilitates communication with the frontend.



Installation:

1-Clone the repository:

       git clone https://github.com/fethi-meza/PMF.git
 
       cd PMF

 2-Install frontend dependencies:
 
        cd client
 
        npm install
 
3-Install backend dependencies:

     cd ../server
 
     npm install

 4-Running the Application
 
 1-1-Start the backend server:
 
     cd server
  
    npm start

 1-2-Start the frontend development server:
 
    cd ../client
  
    npm start

   Access the application: 
  
  Open your browser and go to :
           
    http://localhost:3000.

  
  API Endpoints
    


 http://localhost:3000.
API Endpoints

API Endpoints vach CRUD operations (Create, Read, Update, Delete)

Get_all_vaches :

  http://localhost:3000/
Get_a_vache_by_ID

 http://localhost:4000/api/v1/vaches/1
Create_a_new_vache:

    http://localhost:4000/api/v1/vaches
data :

 {
     "id_vache": 20,
 "date_entree": "2024-05-10",
 "race": "Boki",
 "examens_sante": [],
"vêlages": [],
"production_lait": []
  }
Update_a_vache :

http://localhost:4000/api/v1/vaches/8
data :

  {
 "id_vache": 9,
 "date_entree": "2024-05-22",
 "race": "Jlersey",
 "examens_sante": [],
  "vêlages": [],
"production_lait": []
 }
Delete_Vache :

 http://localhost:4000/api/v1/vaches/20
ExmanaSante CRUD operations (Create, Read, Update, Delete) :

Get_all_examens_sante :

http://127.0.0.1:4000/api/v1/vaches/1/examens/getAllExamens
addExamen:

http://127.0.0.1:4000/api/v1/vaches/1/examens/addExamen
data :

 {
"date_examen": "2024-07-01",
 "maladie": "Recovered Infection"
}
Update Examen :

  http://127.0.0.1:4000/api/v1/vaches/1/examens/2024-07-01
data :

{
 "date_examen": "2024-07-01",
 "maladie": "Recovered Infection"
}
Delete Examen :

    http://127.0.0.1:4000/api/v1/vaches/1/examens/2024-07-01
productionLait CRUD operations (Create, Read, Update, Delete) :

Get_aal_productions_vache_id:

 http://127.0.0.1:4000/api/v1/vaches/1/productions
Create_Prodiction:

http://127.0.0.1:4000/api/v1/vaches/1/productions/addProduction
data:

 {
    "date_production": "2024-06-6",
    "litres_lait": 11
 } 
Update_qountity_lite:

 http://127.0.0.1:4000/api/v1/vaches/1/productions/2024-04-10
data :

 {
    "date_production": "2024-04-22",
    "litres_lait": 18
 }
Delete_Prodiction_lite:

 http://127.0.0.1:4000/api/v1/vaches/1/productions/2024-04-11
vêlage CRUD operations (Create, Read, Update, Delete) :

GET_All_Vêlages for a Vache:

http://127.0.0.1:4000/api/v1/vaches/1/getAllVelages
Create_New_Valge :

  http://127.0.0.1:4000/api/v1/vaches/2/addVelage
data :

{
"date_vêlage": "2024-08-08",
"poids_vêlage_kg": 28
}
Update_specific_vêlage_specific_vache :

http://127.0.0.1:4000/api/v1/vaches/2/updateVelage/2024-08-08
data :

{
    
    "poids_vêlage_kg": 23
}
Delete_velge:

    http://127.0.0.1:4000/api/v1/vaches/1/deleteVelage/2024-08-08

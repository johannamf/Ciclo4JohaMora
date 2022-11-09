# Ciclo4JohaMora

Instrucciones para correr el proyecto localmente:
1. Instalar venv y sus dependencias en Consultas y Apigateway.
2. Prender cada uno de los servidores.
- - Consultas: 
    source venv/bin/activate 
    python3 main.py 
- - ApiGateway: source venv/bin/activate
    python3 main.py 
- - Seguridad: mvn spring-boot:run
- - Frontend/ngx-admin: npm start**

Crear entidad en Angular
1. >ng generate module pages/estudiantes --routing
2. >ng generate component pages/estudiantes/listar
3. >ng generate component pages/estudiantes/crear
4. modificar pages-routing
5.Modificar estudiantes-routing
<!-- ![Next logo](./public/next.svg) -->
<div align="center">
  <img src="./public/next.svg" alt="Next logo" width="500">
</div>

# Next Restaurant Mangement

## Instalación del Proyecto
1. Ejecutar en la terminal el comando

```bash
$   npm install
```

2. Renombra el archiv ```.env.template``` por ```.env``` y asignar valores correspondientes

3. Crear contenedor de POstgreSQL
```bash
$   docker compose up -d
```

4. Correr migraciones
```bash
$   npx prisma db push
```

5. Ejecutar el proyecto en manera de desarrollo y abrir el ```localhost:3000```
```bash
$   npm run dev
```

6. Ejecutar el seed para crear usuarios de prueba
```bash
$   curl http://localhost:3000/api/seed
```
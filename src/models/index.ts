import 'dotenv/config'
import { sequelize } from '../config/database'

sequelize.sync(
{
    force: false,
    alter: true
}).then(() =>
{
    console.log("Tabelas sincronizadas")
})
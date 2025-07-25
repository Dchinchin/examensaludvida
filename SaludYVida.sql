USE [master]
GO
/****** Object:  Database [ClinicaSaludYVida]    Script Date: 24/7/2025 19:24:07 ******/
CREATE DATABASE [ClinicaSaludYVida]
 /*CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ClinicaSaludYVida', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ClinicaSaludYVida.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ClinicaSaludYVida_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ClinicaSaludYVida_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
 */
GO
ALTER DATABASE [ClinicaSaludYVida] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ClinicaSaludYVida].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ClinicaSaludYVida] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET ARITHABORT OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ClinicaSaludYVida] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ClinicaSaludYVida] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ClinicaSaludYVida] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ClinicaSaludYVida] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET RECOVERY FULL 
GO
ALTER DATABASE [ClinicaSaludYVida] SET  MULTI_USER 
GO
ALTER DATABASE [ClinicaSaludYVida] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ClinicaSaludYVida] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ClinicaSaludYVida] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ClinicaSaludYVida] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ClinicaSaludYVida] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ClinicaSaludYVida] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ClinicaSaludYVida', N'ON'
GO
ALTER DATABASE [ClinicaSaludYVida] SET QUERY_STORE = ON
GO
ALTER DATABASE [ClinicaSaludYVida] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ClinicaSaludYVida]
GO
/****** Object:  Table [dbo].[Citas]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Citas](
	[CitaID] [int] IDENTITY(1,1) NOT NULL,
	[PacienteID] [int] NOT NULL,
	[MedicoID] [int] NOT NULL,
	[FechaHora] [datetime] NOT NULL,
	[TipoConsulta] [varchar](100) NOT NULL,
	[Estado] [varchar](20) NULL,
	[Notas] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[CitaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Cita_Medico_Fecha] UNIQUE NONCLUSTERED 
(
	[MedicoID] ASC,
	[FechaHora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CitasServicios]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CitasServicios](
	[CitasServiciosID] [int] IDENTITY(1,1),
	[CitaID] [int] NOT NULL,
	[ServicioID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CitaID] ASC,
	[ServicioID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetallesFactura]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetallesFactura](
	[DetalleID] [int] IDENTITY(1,1) NOT NULL,
	[FacturaID] [int] NOT NULL,
	[ServicioID] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[PrecioUnitario] [decimal](10, 2) NOT NULL,
	[Descuento] [decimal](10, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[DetalleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EntradasHistorial]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EntradasHistorial](
	[EntradaID] [int] IDENTITY(1,1) NOT NULL,
	[HistorialID] [int] NOT NULL,
	[FechaEntrada] [datetime] NULL,
	[TipoEntrada] [varchar](50) NOT NULL,
	[Titulo] [varchar](100) NOT NULL,
	[Descripcion] [text] NULL,
	[MedicoID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[EntradaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Facturas]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Facturas](
	[FacturaID] [int] IDENTITY(1,1) NOT NULL,
	[PacienteID] [int] NOT NULL,
	[FechaEmision] [datetime] NULL,
	[MontoTotal] [decimal](10, 2) NOT NULL,
	[SaldoPendiente] [decimal](10, 2) NULL,
	[Estado] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[FacturaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialesMedicos]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialesMedicos](
	[HistorialID] [int] IDENTITY(1,1) NOT NULL,
	[PacienteID] [int] NOT NULL,
	[FechaCreacion] [datetime] NULL,
	[UltimaActualizacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[HistorialID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[PacienteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicos]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicos](
	[MedicoID] [int] IDENTITY(1,1) NOT NULL,
	[Cedula] [varchar](10) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellido] [varchar](100) NOT NULL,
	[Especialidad] [varchar](100) NOT NULL,
	[Telefono] [varchar](10) NULL,
	[Email] [varchar](100) NULL,
	[FechaContratacion] [date] NULL,
	[Estado] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[MedicoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pacientes]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pacientes](
	[PacienteID] [int] IDENTITY(1,1) NOT NULL,
	[Cedula] [varchar](10) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellido] [varchar](100) NOT NULL,
	[FechaNacimiento] [date] NOT NULL,
	[Genero] [char](1) NULL,
	[Direccion] [varchar](200) NULL,
	[Telefono] [varchar](10) NULL,
	[Email] [varchar](100) NULL,
	[TipoSangre] [varchar](5) NULL,
	[Alergias] [text] NULL,
	[FechaRegistro] [datetime] NULL,
	[Estado] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[PacienteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pagos]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pagos](
	[PagoID] [int] IDENTITY(1,1) NOT NULL,
	[FacturaID] [int] NOT NULL,
	[Monto] [decimal](10, 2) NOT NULL,
	[FechaPago] [datetime] NULL,
	[MetodoPago] [varchar](50) NOT NULL,
	[Comprobante] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[PagoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Servicios]    Script Date: 24/7/2025 19:24:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Servicios](
	[ServicioID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Descripcion] [text] NULL,
	[Costo] [decimal](10, 2) NOT NULL,
	[DuracionEstimada] [int] NULL,
	[Estado] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ServicioID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_Citas_FechaHora]    Script Date: 24/7/2025 19:24:07 ******/
CREATE NONCLUSTERED INDEX [IX_Citas_FechaHora] ON [dbo].[Citas]
(
	[FechaHora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Citas_MedicoID]    Script Date: 24/7/2025 19:24:07 ******/
CREATE NONCLUSTERED INDEX [IX_Citas_MedicoID] ON [dbo].[Citas]
(
	[MedicoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Citas_PacienteID]    Script Date: 24/7/2025 19:24:07 ******/
CREATE NONCLUSTERED INDEX [IX_Citas_PacienteID] ON [dbo].[Citas]
(
	[PacienteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Facturas_Estado]    Script Date: 24/7/2025 19:24:07 ******/
CREATE NONCLUSTERED INDEX [IX_Facturas_Estado] ON [dbo].[Facturas]
(
	[Estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Facturas_PacienteID]    Script Date: 24/7/2025 19:24:07 ******/
CREATE NONCLUSTERED INDEX [IX_Facturas_PacienteID] ON [dbo].[Facturas]
(
	[PacienteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Medicos_Cedula]    Script Date: 24/7/2025 19:24:07 ******/
CREATE NONCLUSTERED INDEX [IX_Medicos_Cedula] ON [dbo].[Medicos]
(
	[Cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Pacientes_Cedula]    Script Date: 24/7/2025 19:24:07 ******/
CREATE NONCLUSTERED INDEX [IX_Pacientes_Cedula] ON [dbo].[Pacientes]
(
	[Cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Pagos_FacturaID]    Script Date: 24/7/2025 19:24:07 ******/
CREATE NONCLUSTERED INDEX [IX_Pagos_FacturaID] ON [dbo].[Pagos]
(
	[FacturaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Citas] ADD  DEFAULT ('Programada') FOR [Estado]
GO
ALTER TABLE [dbo].[DetallesFactura] ADD  DEFAULT ((1)) FOR [Cantidad]
GO
ALTER TABLE [dbo].[DetallesFactura] ADD  DEFAULT ((0)) FOR [Descuento]
GO
ALTER TABLE [dbo].[EntradasHistorial] ADD  DEFAULT (getdate()) FOR [FechaEntrada]
GO
ALTER TABLE [dbo].[Facturas] ADD  DEFAULT (getdate()) FOR [FechaEmision]
GO
ALTER TABLE [dbo].[Facturas] ADD  DEFAULT ((0)) FOR [SaldoPendiente]
GO
ALTER TABLE [dbo].[Facturas] ADD  DEFAULT ('Pendiente') FOR [Estado]
GO
ALTER TABLE [dbo].[HistorialesMedicos] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [dbo].[HistorialesMedicos] ADD  DEFAULT (getdate()) FOR [UltimaActualizacion]
GO
ALTER TABLE [dbo].[Medicos] ADD  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [dbo].[Pacientes] ADD  DEFAULT (getdate()) FOR [FechaRegistro]
GO
ALTER TABLE [dbo].[Pacientes] ADD  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [dbo].[Pagos] ADD  DEFAULT (getdate()) FOR [FechaPago]
GO
ALTER TABLE [dbo].[Servicios] ADD  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [dbo].[Citas]  WITH CHECK ADD  CONSTRAINT [FK_Cita_Medico] FOREIGN KEY([MedicoID])
REFERENCES [dbo].[Medicos] ([MedicoID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Citas] CHECK CONSTRAINT [FK_Cita_Medico]
GO
ALTER TABLE [dbo].[Citas]  WITH CHECK ADD  CONSTRAINT [FK_Cita_Paciente] FOREIGN KEY([PacienteID])
REFERENCES [dbo].[Pacientes] ([PacienteID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Citas] CHECK CONSTRAINT [FK_Cita_Paciente]
GO
ALTER TABLE [dbo].[CitasServicios]  WITH CHECK ADD  CONSTRAINT [FK_CitaServicio_Cita] FOREIGN KEY([CitaID])
REFERENCES [dbo].[Citas] ([CitaID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CitasServicios] CHECK CONSTRAINT [FK_CitaServicio_Cita]
GO
ALTER TABLE [dbo].[CitasServicios]  WITH CHECK ADD  CONSTRAINT [FK_CitaServicio_Servicio] FOREIGN KEY([ServicioID])
REFERENCES [dbo].[Servicios] ([ServicioID])
GO
ALTER TABLE [dbo].[CitasServicios] CHECK CONSTRAINT [FK_CitaServicio_Servicio]
GO
ALTER TABLE [dbo].[DetallesFactura]  WITH CHECK ADD  CONSTRAINT [FK_Detalle_Factura] FOREIGN KEY([FacturaID])
REFERENCES [dbo].[Facturas] ([FacturaID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DetallesFactura] CHECK CONSTRAINT [FK_Detalle_Factura]
GO
ALTER TABLE [dbo].[DetallesFactura]  WITH CHECK ADD  CONSTRAINT [FK_Detalle_Servicio] FOREIGN KEY([ServicioID])
REFERENCES [dbo].[Servicios] ([ServicioID])
GO
ALTER TABLE [dbo].[DetallesFactura] CHECK CONSTRAINT [FK_Detalle_Servicio]
GO
ALTER TABLE [dbo].[EntradasHistorial]  WITH CHECK ADD  CONSTRAINT [FK_Entrada_Historial] FOREIGN KEY([HistorialID])
REFERENCES [dbo].[HistorialesMedicos] ([HistorialID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[EntradasHistorial] CHECK CONSTRAINT [FK_Entrada_Historial]
GO
ALTER TABLE [dbo].[EntradasHistorial]  WITH CHECK ADD  CONSTRAINT [FK_Entrada_Medico] FOREIGN KEY([MedicoID])
REFERENCES [dbo].[Medicos] ([MedicoID])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[EntradasHistorial] CHECK CONSTRAINT [FK_Entrada_Medico]
GO
ALTER TABLE [dbo].[Facturas]  WITH CHECK ADD  CONSTRAINT [FK_Factura_Paciente] FOREIGN KEY([PacienteID])
REFERENCES [dbo].[Pacientes] ([PacienteID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Facturas] CHECK CONSTRAINT [FK_Factura_Paciente]
GO
ALTER TABLE [dbo].[HistorialesMedicos]  WITH CHECK ADD  CONSTRAINT [FK_Historial_Paciente] FOREIGN KEY([PacienteID])
REFERENCES [dbo].[Pacientes] ([PacienteID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[HistorialesMedicos] CHECK CONSTRAINT [FK_Historial_Paciente]
GO
ALTER TABLE [dbo].[Pagos]  WITH CHECK ADD  CONSTRAINT [FK_Pago_Factura] FOREIGN KEY([FacturaID])
REFERENCES [dbo].[Facturas] ([FacturaID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Pagos] CHECK CONSTRAINT [FK_Pago_Factura]
GO
ALTER TABLE [dbo].[Citas]  WITH CHECK ADD CHECK  (([Estado]='NoPresento' OR [Estado]='Cancelada' OR [Estado]='Completada' OR [Estado]='Programada'))
GO
ALTER TABLE [dbo].[EntradasHistorial]  WITH CHECK ADD CHECK  (([TipoEntrada]='Nota' OR [TipoEntrada]='Procedimiento' OR [TipoEntrada]='Tratamiento' OR [TipoEntrada]='Diagnóstico' OR [TipoEntrada]='Consulta'))
GO
ALTER TABLE [dbo].[Facturas]  WITH CHECK ADD CHECK  (([Estado]='Vencida' OR [Estado]='Cancelada' OR [Estado]='Pagada' OR [Estado]='Pendiente'))
GO
ALTER TABLE [dbo].[Pacientes]  WITH CHECK ADD CHECK  (([Genero]='O' OR [Genero]='F' OR [Genero]='M'))
GO
ALTER TABLE [dbo].[Pagos]  WITH CHECK ADD CHECK  (([MetodoPago]='Cheque' OR [MetodoPago]='Transferencia' OR [MetodoPago]='Tarjeta' OR [MetodoPago]='Efectivo'))
GO
USE [master]
GO
ALTER DATABASE [ClinicaSaludYVida] SET  READ_WRITE 
GO

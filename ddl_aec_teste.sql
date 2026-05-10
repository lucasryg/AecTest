CREATE DATABASE AecTeste

USE AecTeste

CREATE TABLE usuario (
    id_usuario  INT           IDENTITY PRIMARY KEY NOT NULL,
    nome        VARCHAR(100)  NOT NULL,
    usuario     VARCHAR(150)  NOT NULL UNIQUE,
    senha       VARCHAR(255)  NOT NULL,
    created_at  DATETIME      DEFAULT GETDATE()
);

CREATE TABLE endereco (
    id_endereco  INT          IDENTITY PRIMARY KEY NOT NULL,
    cep          CHAR(8)      NOT NULL,
    logradouro   VARCHAR(80)  NOT NULL,
    complemento  VARCHAR(80),
    bairro       VARCHAR(50)  NOT NULL,
    cidade       VARCHAR(50)  NOT NULL,
    uf           CHAR(2)      NOT NULL,
    numero       VARCHAR(10)  NOT NULL,
    id_usuario   INT          NOT NULL,
    created_at   DATETIME     DEFAULT GETDATE(),
    CONSTRAINT FK_Id_Usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuario(id_usuario)
);

CREATE INDEX IX_Endereco_IdUsuario ON endereco(id_usuario);
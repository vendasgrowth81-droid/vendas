# Correios Rastreio - Portal de Rastreamento

Site de rastreamento de encomendas para deploy no Netlify.

## Estrutura

```
├── netlify.toml          # Configuração Netlify
├── netlify/
│   └── functions/
│       └── consultar.js  # API de consulta CPF
└── rastreamentotributario.online/
    ├── index.html        # Redirect para /encomenda/
    ├── _redirects        # Redirects da API
    └── encomenda/
        ├── index.html    # Página principal (formulário CPF)
        ├── app/
        │   └── index.html # Página de status e pagamento
        ├── api/
        ├── css/
        ├── js/
        └── images/
```

## Deploy no Netlify

1. Faça push do repositório para o GitHub
2. Conecte o repositório ao Netlify
3. Configurações de build:
   - **Publish directory:** `rastreamentotributario.online`
   - **Functions directory:** `netlify/functions` (padrão)
4. Deploy

## Fluxo do Site

1. **Página inicial** (`/encomenda/`): Usuário digita CPF e clica em Consultar
2. **Modal de confirmação**: Após consulta, exibe imagem com dados (nome, CPF) e código de rastreio
3. **Botão "Verificar Status"**: Redireciona para página de status
4. **Página de status** (`/encomenda/app/`): Timeline da entrega e botão "Efetuar Pagamento"
5. **Checkout**: Redireciona para o gateway de pagamento

## API

- `POST /api/consultar` - Consulta CPF (body: FormData com `cpf`)

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
    };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    let cpf = '';
    if (event.httpMethod === 'POST' && event.body) {
      const ct = (event.headers['content-type'] || '').toLowerCase();
      if (ct.includes('application/json')) {
        const body = JSON.parse(event.body);
        cpf = (body.cpf || '').replace(/\D/g, '');
      } else {
        const params = new URLSearchParams(event.body);
        cpf = (params.get('cpf') || '').replace(/\D/g, '');
      }
    } else if (event.httpMethod === 'GET' && event.queryStringParameters?.cpf) {
      cpf = (event.queryStringParameters.cpf || '').replace(/\D/g, '');
    }

    if (!cpf || cpf.length !== 11) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'CPF inválido ou não informado.',
        }),
      };
    }

    const nome = `Consumidor ${cpf.slice(-4)}`;
    const codigoRastreio = 'NC 654 471 898 BR';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        nome,
        cpf: cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
        codigo_rastreio: codigoRastreio,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Erro ao processar consulta.',
      }),
    };
  }
};

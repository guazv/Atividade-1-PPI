import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const server = express();


server.get('/',(requisicao, resposta )=> {
     resposta.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Tabela de Reajuste</title>
</head>
<body>
  <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; text-align: center; font-family: Arial; width: 700px;">
    <tr style="background-color: #f2f2f2; font-weight: bold;">
      <td>Faixa etária</td>
      <td>Sexo</td>
      <td>Reajuste</td>
      <td>Desconto<br>(até 10 anos na empresa)</td>
      <td>Acréscimo<br>(mais de 10 anos na empresa)</td>
    </tr>
    <tr>
      <td>18 – 39</td>
      <td>M</td>
      <td>10%</td>
      <td>R$10,00</td>
      <td>R$17,00</td>
    </tr>
    <tr>
      <td>18 – 39</td>
      <td>F</td>
      <td>8%</td>
      <td>R$11,00</td>
      <td>R$16,00</td>
    </tr>
    <tr>
      <td>40 – 69</td>
      <td>M</td>
      <td>8%</td>
      <td>R$ 5,00</td>
      <td>R$15,00</td>
    </tr>
    <tr>
      <td>40 – 69</td>
      <td>F</td>
      <td>10%</td>
      <td>R$ 7,00</td>
      <td>R$14,00</td>
    </tr>
    <tr>
      <td>70 – 99</td>
      <td>M</td>
      <td>15%</td>
      <td>R$15,00</td>
      <td>R$13,00</td>
    </tr>
    <tr>
      <td>70 – 99</td>
      <td>F</td>
      <td>17%</td>
      <td>R$17,00</td>
      <td>R$12,00</td>
    </tr>
  </table>
</body>
</html>

`);




if(!idade || !sexo || !sal || !anodeentrada ||!matricula) {
  return res.send("<h2>Erro: Todos os parâmetros devem ser informados!</h2>");
}

const idadecorreta =parseInt(idade);
const salariocorreto =parseFloat(sal);
const anocerto =parseInt(anodeentrada);
const matcerta =parseInt(matricula);


 if (idadecorreta <= 16) {
        return res.send("<h2>Erro: Idade deve ser maior que 16 anos!</h2>");
    }
    if (isNaN(salariocorreto)) {
        return res.send("<h2>Erro: Salário base deve ser um número válido!</h2>");
    }
    if (anocerto <= 1960 || isNaN(anocerto)) {
        return res.send("<h2>Erro: Ano de contratação inválido!</h2>");
    }
    if (matcerta <= 0 || isNaN(matcerta)) {
        return res.send("<h2>Erro: Matrícula inválida!</h2>");
    }

     let reajuste = 0;
    if (sexo.toUpperCase() === 'F') {
        reajuste = salariocorreto * 0.12;
    } else {
        reajuste = salariocorreto * 0.10;
    }

    const salarioFinal = salariocorreto + reajuste;


    resposta.send(`
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Reajuste Salarial</title>
                <style>
                    body { font-family: Arial; background: #f0f0f0; padding: 20px; }
                    .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px #aaa; }
                    h2 { color: #333; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Resultado do Cálculo</h2>
                    <p><strong>Idade:</strong> ${idadecorreta}</p>
                    <p><strong>Sexo:</strong> ${sexo}</p>
                    <p><strong>Salário Base:</strong> R$ ${salariocorreto.toFixed(2)}</p>
                    <p><strong>Ano de Contratação:</strong> ${anocerto}</p>
                    <p><strong>Matrícula:</strong> ${matcerta}</p>
                    <hr>
                    <p><strong>Salário Reajustado:</strong> <span style="color: green;">R$ ${salarioFinal.toFixed(2)}</span></p>
                </div>
            </body>
        </html>
    `);
});


server.listen(porta, host, () =>{
    console.log(`servidor escutando em https://${host}:${porta}`);
});

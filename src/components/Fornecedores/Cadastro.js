import React, { Component } from 'react';
import axios from 'axios';
import { Select, option } from 'antd';
import { connect } from 'react-redux';
import { throws } from 'assert';
const Option = Select.Option;
class Cadastro extends Component {
  state = {
    nome_fornecedor: 'xpto',
    CNPJ: '70.780.116/0001-76',
    limite_1: '20000',
    limite_2: '20000.01',
    limite_3: '50000',
    limite_4: '50000.01',
    desconto_1: '5',
    desconto_2: '6',
    desconto_3: '8',
    desconto_4: '10',
    taxa_antecipacao: '80',
    cardNumber: '4111111111111111',
    cardMonth: '09',
    cardYear: '2022',
    compras : '30000',
  };

  validateCNPJ = cnpj => {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') return false;
    if (cnpj.length !== 14) return false;
    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    )
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = 5;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado != digitos[0]) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = 6;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;
    return true;
  };

  handleValidation = (valid, num) => {
    var input_elements = document.getElementsByName('div-input');
    var small_elements = document.getElementsByTagName('small');
    console.log(num);
    if (!valid) {
      if (!input_elements[num].classList.contains('has-error')) input_elements[num].classList.add('has-error');
      small_elements[num].classList.remove('invisible');
      if (input_elements[num].classList.contains('has-success')) input_elements[num].classList.remove('has-success');
    } else {
      if (input_elements[num].classList.contains('has-error')) input_elements[num].classList.remove('has-error');
      if (!input_elements[num].classList.contains('invisible')) small_elements[num].classList.add('invisible');
      if (!input_elements[num].classList.contains('has-success')) input_elements[num].classList.add('has-success');
    }
  };

  handleRemoveValidation = () => {
    var input_elements = document.getElementsByName('div-input');
    for (let index = 0; index < input_elements.length; index++) {
      if (input_elements[index].classList.contains('has-success'))
        input_elements[index].classList.remove('has-success');
    }
  };

  handleFieldsCheck = () => {
    let fail = false;
    let CNPJ_valid = this.validateCNPJ(this.state.CNPJ);
    let nome_fornecedor =
      this.state.nome_fornecedor.length <= 50 && this.state.nome_fornecedor.length >= 1 ? true : false;
    let limite_1_valid =
      (this.state.limite_1.length <= 10 && this.state.limite_1.length >= 1) || this.state.franq_leroy == true
        ? true
        : false;
    let limite_2_valid =
      (this.state.limite_2.length <= 10 && this.state.limite_2.length >= 1) || this.state.franq_leroy == true
        ? true
        : false;
    let limite_3_valid =
      (this.state.limite_3.length <= 10 && this.state.limite_3.length >= 1) || this.state.franq_leroy == true
        ? true
        : false;
    let limite_4_valid =
      (this.state.limite_4.length <= 10 && this.state.limite_4.length >= 1) || this.state.franq_leroy == true
        ? true
        : false;
    let desconto_1_valid =
      (parseFloat(this.state.desconto_1) <= 100 && this.state.desconto_1.length >= 1) || this.state.franq_leroy == true
        ? true
        : false;
    let desconto_2_valid =
      (parseFloat(this.state.desconto_2) <= 100 && this.state.desconto_2.length >= 1) || this.state.franq_leroy == true
        ? true
        : false;
    let desconto_3_valid =
      (parseFloat(this.state.desconto_3) <= 100 && this.state.desconto_3.length >= 1) || this.state.franq_leroy == true
        ? true
        : false;
    let desconto_4_valid =
      (parseFloat(this.state.desconto_4) <= 100 && this.state.desconto_4.length >= 1) || this.state.franq_leroy == true
        ? true
        : false;
    let taxa_antecipacao_valid =
      parseFloat(this.state.taxa_antecipacao) <= 100 && this.state.taxa_antecipacao.length >= 1 ? true : false;
    let card_number_valid = this.state.cardNumber.length <= 50 && this.state.cardNumber.length >= 1 ? true : false;
    let card_month_valid = this.state.cardMonth.length == 2 ? true : false;
    let card_year_valid = this.state.cardYear.length == 4 ? true : false;
    let compras_valid = this.state.compras.length <= 50 && this.state.compras.length >= 1 ? true : false;

    if (!nome_fornecedor) {
      fail = true;
      this.handleValidation(false, 0);
    } else {
      this.handleValidation(true, 0);
    }

    if (!CNPJ_valid) {
      fail = true;
      this.handleValidation(false, 1);
    } else {
      this.handleValidation(true, 1);
    }

    if (!compras_valid) {
      this.handleValidation(false, 2);
      fail = true;
    } else {
      this.handleValidation(true, 2);
    }

    if (!desconto_1_valid) {
      this.handleValidation(false, 4);
      fail = true;
    } else {
      this.handleValidation(true, 4);
    }
    if (!desconto_2_valid) {
      this.handleValidation(false, 6);
      fail = true;
    } else {
      this.handleValidation(true, 6);
    }
    if (!desconto_3_valid) {
      this.handleValidation(false, 8);
      fail = true;
    } else {
      this.handleValidation(true, 8);
    }
    if (!desconto_4_valid) {
      this.handleValidation(false, 10);
      fail = true;
    } else {
      this.handleValidation(true, 10);
    }
    if (!limite_1_valid) {
      this.handleValidation(false, 3);
    } else {
      this.handleValidation(true, 3);
    }
    if (!limite_2_valid) {
      this.handleValidation(false, 5);
      fail = true;
    } else {
      this.handleValidation(true, 5);
    }
    if (!limite_3_valid) {
      this.handleValidation(false, 7);
      fail = true;
    } else {
      this.handleValidation(true, 7);
    }
    if (!limite_4_valid) {
      this.handleValidation(false, 9);
      fail = true;
    } else {
      this.handleValidation(true, 9);
    }
    if (!taxa_antecipacao_valid) {
      this.handleValidation(false, 11);
      fail = true;
    } else {
      this.handleValidation(true, 11);
    }

    if (!card_year_valid) {
      this.handleValidation(false, 12);
      fail = true;
    } else {
      this.handleValidation(true, 12);
    }

    if (!card_month_valid) {
      this.handleValidation(false, 13);
      fail = true;
    } else {
      this.handleValidation(true, 13);
    }

    if (!card_number_valid) {
      this.handleValidation(false, 14);
      fail = true;
    } else {
      this.handleValidation(true, 14);
    }
    
    if (fail) return false;
    else return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.editing !== true) {
      if (!this.handleFieldsCheck()) {
        var elem = document.getElementsByTagName('form');
        elem[0].addEventListener('change', this.handleFieldsCheck, false);
        return;
      }
    }
    
      axios
        .post('http://localhost:8000', { input: this.state })
        .catch(error => {
          if (error.response.status == '400') {
            this.setState({ fail: true });
          }
        })
        .then(res => {
          this.handleRemoveValidation();
          if (this.state.fail) {
            document.getElementsByClassName('myAlert-top')[1].style.display = 'block';
            setTimeout(function() {
              if (typeof document.getElementsByClassName('myAlert-top')[1] !== 'undefined')
                document.getElementsByClassName('myAlert-top')[1].style.display = 'none';
            }, 4000);
            this.setState({ fail: false });
          } else {
            document.getElementsByClassName('myAlert-top')[0].style.display = 'block';
            setTimeout(function() {
              if (typeof document.getElementsByClassName('myAlert-top')[0] !== 'undefined')
                document.getElementsByClassName('myAlert-top')[0].style.display = 'none';
            }, 4000);

            this.setState({
              nome_fornecedor: '',
              CNPJ: '',
              limite_1: '',
              limite_2: '',
              limite_3: '',
              limite_4: '',
              desconto_1: '',
              desconto_2: '',
              desconto_3: '',
              desconto_4: '',
              taxa_antecipacao: '',
              cardNumber: '',
              cardMonth: '',
              cardYear: '',
              editing: false,
            });
          }
        });
    };

  handleCNPJ_mask = (e, estado, index) => {
    let value = e.target.value;
    if (value.length > estado.length) {
      if (value.length === 3) value = value.slice(0, 2) + '.' + value.slice(2);
      else if (value.length === 7) value = value.slice(0, 6) + '.' + value.slice(6);
      else if (value.length === 11) value = value.slice(0, 10) + '/' + value.slice(10);
      else if (value.length === 16) value = value.slice(0, 15) + '-' + value.slice(15);

      if (value.length === 2) value += '.';
      if (value.length === 6) value += '.';
      if (value.length === 10) value += '/';
      if (value.length === 15) value += '-';
    }
    if (index === 0) this.setState({ CNPJ: value });
    else this.setState({ CNPJ_matriz: value });
  };


  render() {
    return (
      <div>
        <h1 className="page-title">Cadastro do Fornecedor</h1>
        <form onSubmit={this.handleSubmit} className="container-fluid">
          <div style={{ display: 'none' }} class="myAlert-top alert alert-success ">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">
              &times;
            </a>
            <strong>Sucesso!</strong> Cadastro efetuado com sucesso.
          </div>
          <div style={{ display: 'none' }} class="myAlert-top alert alert-danger">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">
              &times;
            </a>
            <strong>Erro!</strong> CNPJ ja cadastrado.
          </div>
          <div className="form-group row has-feedback">
           
            <div name="div-input" className="col-lg-8 float-right">
              <label for="nomeFornecedor">Fornecedor</label>
              <input
                type="text"
                value={this.state.nome_fornecedor}
                onChange={event => {
                  this.setState({ nome_fornecedor: event.target.value });
                }}
                className="form-control"
                id="nomeFornecedor"
                placeholder="Nome do forcecedor"
              />
              <small className="form-text text-muted text-danger invisible">Nome inválido</small>
            </div>
          </div>

          <div className="form-group row has-feedback">
            <div name="div-input" className="col-lg-6 float-left">
              <label for="cnpj">CNPJ</label>
              <input
                type="text"
                value={this.state.CNPJ}
                onChange={event => {
                  this.handleCNPJ_mask(event, this.state.CNPJ, 0);
                }}
                className="form-control"
                id="cnpj"
                placeholder=""
              />
              <small className="form-text text-muted text-danger invisible">CNPJ inválido</small>
            </div>
           
          </div>

        
          <div className="form-group row has-feedback">
          <div name="div-input" className="col-lg-6">
              <label for="compras">Volume de compras ano anterior (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.compras}
                onChange={event => {
                  this.setState({
                    compras : event.target.value,
                  });
                }}
                className="form-control"
                id="compras"
                
              />
              <small className="form-text text-muted text-danger invisible">Valor inválido</small>
            </div>
            <div name="div-input" className="col-lg-6">
              <label for="limite_1">Valor máximo faixa 1 (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.limite_1}
                onChange={event => {
                  this.setState({
                    limite_1: event.target.value,
                    limite_2: (parseFloat(event.target.value) + 0.01).toFixed(2),
                  });
                }}
                className="form-control"
                id="limite_1"
                
              />
              <small className="form-text text-muted text-danger invisible">Limite inválido</small>
            </div>
          </div>

          <div className="form-group row has-feedback">
            <div name="div-input" className="col-lg-6">
              <label for="desconto_1">Desconto 1 (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.desconto_1}
                onChange={event => {
                  this.setState({ desconto_1: event.target.value });
                }}
                className="form-control"
                id="desconto_1"
                
              />
              <small className="form-text text-muted text-danger invisible">Desconto inválido</small>
            </div>
            <div name="div-input" className="col-lg-6">
              <label for="limite_2">Valor minimo faixa 2 (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.limite_2}
                className="form-control"
                id="limite_2"
                
              />
              <small className="form-text text-muted text-danger invisible">Limite inválido</small>
            </div>
          </div>

          <div className="form-group row has-feedback">
            <div name="div-input" className="col-lg-6">
              <label for="desconto_2">Desconto 2 (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.desconto_2}
                onChange={event => {
                  this.setState({ desconto_2: event.target.value });
                }}
                className="form-control"
                id="desconto_2"
                
              />
              <small className="form-text text-muted text-danger invisible">Desconto inválido</small>
            </div>
            <div name="div-input" className="col-lg-6">
              <label for="limite_3">Valor máximo faixa 2 (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.limite_3}
                onChange={event => {
                  this.setState({
                    limite_3: event.target.value,
                    limite_4: (parseFloat(event.target.value) + 0.01).toFixed(2),
                  });
                }}
                className="form-control"
                id="limite_3"
              />
              <small className="form-text text-muted text-danger invisible">Limite inválido</small>
            </div>
          </div>

          <div className="form-group row has-feedback">
            <div name="div-input" className="col-lg-6">
              <label for="desconto_3">Desconto 3 (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.desconto_3}
                onChange={event => {
                  this.setState({ desconto_3: event.target.value });
                }}
                className="form-control"
                id="desconto_3"
                
              />
              <small className="form-text text-muted text-danger invisible">Desconto inválido</small>
            </div>
            <div name="div-input" className="col-lg-6">
              <label for="limite_4">Valor minimo faixa 3 (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.limite_4}
                className="form-control"
                id="limite_4"
                
              />
              <small className="form-text text-muted text-danger invisible">Limite inválido</small>
            </div>
          </div>

          <div className="form-group row has-feedback">
            <div name="div-input" className="col-lg-6">
              <label for="desconto_4">Desconto 4 (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.desconto_4}
                onChange={event => {
                  this.setState({ desconto_4: event.target.value });
                }}
                className="form-control"
                id="desconto_4"
                
              />
              <small className="form-text text-muted text-danger invisible">Desconto inválido</small>
            </div>
            <div name="div-input" className="col-lg-6">
              <label for="taxa_antecipacao">Taxa de antecipação (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={this.state.taxa_antecipacao}
                onChange={event => {
                  this.setState({ taxa_antecipacao: event.target.value });
                }}
                className="form-control"
                id="taxa_antecipacao"
              />
              <small className="form-text text-muted text-danger invisible">Taxa inválida</small>
            </div>
          </div>

          

       
          <div className="form-group row has-feedback">
            <div name="div-input" className="col-lg-4">
              <label for="ano">Ano</label>

              <select
                class="custom-select"
                value={this.state.cardYear}
                onChange={event => {
                  this.setState({ cardYear: event.target.value });
                }}
                className="form-control"
                id="agencia"
              >
                <option selected>Year...</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <small className="form-text text-muted text-danger invisible">Ano inválido</small>
            </div>
            <div name="div-input" className="col-lg-4">
              <label for="ano">Mes</label>

              <select
                class="custom-select"
                value={this.state.cardMonth}
                onChange={event => {
                  this.setState({ cardMonth: event.target.value });
                }}
                className="form-control"
                id="agencia"
              >
                <option selected>Month...</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <small className="form-text text-muted text-danger invisible">Mes inválido</small>
            </div>
          </div>

          <div className="form-group row has-feedback">
            <div name="div-input" className="col-lg-8">
              <label for="conta">Numero cartao</label>
              <input
                type="text"
                value={this.state.cardNumber}
                onChange={event => {
                  this.setState({ cardNumber: event.target.value });
                }}
                className="form-control"
                id="conta"
              />
              <small className="form-text text-muted text-danger invisible">Numero inválido</small>
            </div>
          </div>
          
          
          <button style={{ float: 'left' }} type="submit" className="btn btn-primary">
            Submit
          </button>
          
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  login: state.login,
});

export default connect(mapState)(Cadastro);

from pathlib import Path

root = Path(__file__).resolve().parent
html_path = root / 'html' / 'produtos.html'
pdf_path = root / 'pdf' / 'manual-artech.pdf'
pdf_path.parent.mkdir(exist_ok=True)

html = """<!DOCTYPE html>
<html lang=\"pt-BR\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>Produtos ArTech</title>
    <link rel=\"stylesheet\" href=\"../css/style.css\" />
    <link rel=\"stylesheet\" href=\"../css/segundo.css\" />
  </head>
  <body>
    <header>
      <ul>
        <li>
          <a href=\"../index.html\">
            <img src=\"../img/logo.png\" alt=\"ArTech\" />
          </a>
        </li>
        <li><a href=\"../index.html\">Início</a></li>
        <li><a href=\"produtos.html\">Produtos</a></li>
        <li><a href=\"#\">Projetos</a></li>
        <li><a href=\"#\">Sobre</a></li>
        <li><a href=\"#\">Contato</a></li>
      </ul>
    </header>

    <main>
      <section class=\"hero-produtos\">
        <div class=\"hero-content\">
          <div class=\"hero-texto\">
            <p class=\"eyebrow\">Catálogo completo</p>
            <h1>Produtos ArTech para automação, controle e inovação.</h1>
            <p class=\"microtexto\">
              Explore nossa coleção de soluções inteligentes com documentação
              pronta para download em PDF.
            </p>
          </div>
          <div class=\"hero-imagem\">
            <img src=\"../img/automacao.png\" alt=\"Automação ArTech\" />
          </div>
        </div>
      </section>

      <section class=\"produtos-section\" aria-label=\"Lista de produtos\">
        <div class=\"produtos-grid\">
          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Módulo de controle industrial\" />
            <h3>Módulo de Controle Industrial</h3>
            <p>Plataforma robusta para automação de linhas e processos com integração simples.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Kit de sensores\" />
            <h3>Kit de Sensores Inteligentes</h3>
            <p>Conjunto de sensores para coleta de dados em tempo real e análise de desempenho.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Painel de supervisão\" />
            <h3>Painel de Supervisão</h3>
            <p>Interface visual para monitoramento e controle remoto da operação.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Central de energia\" />
            <h3>Central de Energia</h3>
            <p>Estrutura eficiente para distribuição e gestão energética em ambientes modernos.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Dispositivo IoT\" />
            <h3>Dispositivo IoT</h3>
            <p>Módulo conectado para monitoramento remoto via rede e integração com aplicações.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Hub de comunicação\" />
            <h3>Hub de Comunicação</h3>
            <p>Unidade central para conectar máquinas, sensores e plataformas de gestão.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Estação de trabalho\" />
            <h3>Estação de Trabalho</h3>
            <p>Ambiente compacto com recursos de controle para operações técnicas e testes.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Sistema de segurança\" />
            <h3>Sistema de Segurança</h3>
            <p>Proteção completa com sensores, alertas e gestão centralizada de acessos.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Controlador de temperatura\" />
            <h3>Controlador de Temperatura</h3>
            <p>Equipamento preciso para controle térmico em ambientes industriais e laboratoriais.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Módulo de acionamento\" />
            <h3>Módulo de Acionamento</h3>
            <p>Componente de alta performance para ativar motores e sistemas de movimento.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Sistema de rastreamento\" />
            <h3>Sistema de Rastreamento</h3>
            <p>Monitoramento de ativos com integração de localização e histórico de operação.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Placa de aquisição\" />
            <h3>Placa de Aquisição</h3>
            <p>Unidade dedicada à leitura de sinais e integração com sistemas analíticos.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Sistema embarcado\" />
            <h3>Sistema Embarcado</h3>
            <p>Solución compacta para projetos de prototipagem e desenvolvimento tecnológico.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Unidade de automação residencial\" />
            <h3>Unidade de Automação Residencial</h3>
            <p>Estrutura inteligente para controle de iluminação, segurança e conforto.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>

          <article class=\"produto-card\">
            <img src=\"../img/produtos/exemplo.jpg\" alt=\"Kit de prototipagem\" />
            <h3>Kit de Prototipagem</h3>
            <p>Conjunto ideal para criar soluções rápidas, testáveis e escaláveis em laboratório.</p>
            <a class=\"btn-pdf\" href=\"../pdf/manual-artech.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">Ver manual em PDF</a>
          </article>
        </div>
      </section>
    </main>

    <footer>
      <p>© 2026 ArTech — Soluções inteligentes para o futuro.</p>
    </footer>
  </body>
</html>"""

html_path.write_text(html, encoding='utf-8')
pdf_path.write_bytes(b'%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT /F1 18 Tf 20 100 Td (Manual ArTech) Tj ET\nendstream\nendobj\n5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000062 00000 n \n0000000119 00000 n \n0000000207 00000 n \n0000000302 00000 n \ntrailer\n<< /Root 1 0 R /Size 6 >>\nstartxref\n0\n%%EOF\n')

print('Updated', html_path)
print('Created', pdf_path)

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path("C:/Windows/Fonts")

INK = colors.HexColor("#101820")
TERRACOTTA = colors.HexColor("#D6532B")
GREEN = colors.HexColor("#53843A")
SOFT = colors.HexColor("#F4F4F4")
LINE = colors.HexColor("#D4DFDC")
MUTED = colors.HexColor("#4A5560")

pdfmetrics.registerFont(TTFont("Arial", str(FONT_DIR / "arial.ttf")))
pdfmetrics.registerFont(TTFont("Arial-Bold", str(FONT_DIR / "arialbd.ttf")))


def paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text.replace("&", "&amp;"), style)


def build_styles():
    base = getSampleStyleSheet()
    return {
        "eyebrow": ParagraphStyle(
            "Eyebrow",
            parent=base["Normal"],
            fontName="Arial-Bold",
            fontSize=8,
            leading=11,
            textColor=TERRACOTTA,
            spaceAfter=4 * mm,
            tracking=1.2,
        ),
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Arial-Bold",
            fontSize=23,
            leading=27,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=4 * mm,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["Normal"],
            fontName="Arial",
            fontSize=10,
            leading=15,
            textColor=MUTED,
            spaceAfter=8 * mm,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Arial-Bold",
            fontSize=13,
            leading=16,
            textColor=INK,
            spaceBefore=4 * mm,
            spaceAfter=3 * mm,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Arial",
            fontSize=8.6,
            leading=13,
            textColor=INK,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["Normal"],
            fontName="Arial",
            fontSize=7.5,
            leading=10.5,
            textColor=MUTED,
        ),
        "table_label": ParagraphStyle(
            "TableLabel",
            parent=base["Normal"],
            fontName="Arial-Bold",
            fontSize=7,
            leading=8.5,
            textColor=INK,
        ),
        "table_value": ParagraphStyle(
            "TableValue",
            parent=base["Normal"],
            fontName="Arial",
            fontSize=7,
            leading=8.5,
            textColor=INK,
        ),
    }


STYLES = build_styles()


def draw_page(canvas, document):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(INK)
    canvas.rect(0, height - 8 * mm, width, 8 * mm, stroke=0, fill=1)
    canvas.setFillColor(TERRACOTTA)
    canvas.rect(0, 0, width / 3, 2.5 * mm, stroke=0, fill=1)
    canvas.setFillColor(colors.HexColor("#FBE369"))
    canvas.rect(width / 3, 0, width / 3, 2.5 * mm, stroke=0, fill=1)
    canvas.setFillColor(GREEN)
    canvas.rect(2 * width / 3, 0, width / 3, 2.5 * mm, stroke=0, fill=1)
    canvas.setFont("Arial", 7)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(width - 18 * mm, 8 * mm, f"Página {document.page}")
    canvas.restoreState()


def add_bullets(story, items):
    for item in items:
        story.append(paragraph(f"• {item}", STYLES["body"]))
        story.append(Spacer(1, 0.8 * mm))


def add_specs(story, rows):
    data = [
        [
            paragraph("Parámetro", STYLES["table_label"]),
            paragraph("Especificación", STYLES["table_label"]),
        ]
    ]
    for label, value in rows:
        data.append(
            [
                paragraph(label, STYLES["table_label"]),
                paragraph(value, STYLES["table_value"]),
            ]
        )

    table = Table(data, colWidths=[58 * mm, 112 * mm], repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, SOFT]),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 0.8 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.8 * mm),
            ]
        )
    )
    story.append(table)


def build_sheet(output: Path, model: str, title: str, subtitle: str, features, specs, sections=None):
    output.parent.mkdir(parents=True, exist_ok=True)
    document = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=17 * mm,
        title=f"Ficha técnica Infitek {model}",
        author="Del Carpio",
        subject="Resumen técnico en español",
    )
    story = [
        paragraph(f"INFITEK · {model}", STYLES["eyebrow"]),
        paragraph(title, STYLES["title"]),
        paragraph(subtitle, STYLES["subtitle"]),
        paragraph("Características", STYLES["section"]),
    ]
    add_bullets(story, features)
    story.extend([Spacer(1, 3 * mm), paragraph("Especificaciones técnicas", STYLES["section"])])
    add_specs(story, specs)

    for section_title, section_items in sections or []:
        story.extend([Spacer(1, 2 * mm), paragraph(section_title, STYLES["section"])])
        add_bullets(story, section_items)

    story.extend(
        [
            Spacer(1, 7 * mm),
            paragraph(
                "Documento técnico en español preparado a partir del material del fabricante suministrado al proyecto. La configuración, disponibilidad y alcance de suministro deben confirmarse con Del Carpio al solicitar cotización.",
                STYLES["small"],
            ),
        ]
    )
    document.build(story, onFirstPage=draw_page, onLaterPages=draw_page)


def main():
    build_sheet(
        ROOT / "public/productos/infitek/wb-series/ficha-tecnica-es.pdf",
        "WB-1R2H-7",
        "Baño de Agua de Acero Inoxidable WB-1R2H-7",
        "Baño termostático de dos orificios y 6,1 L con calentamiento por convección natural, control PID y temporización.",
        [
            "Cámara interior y cubierta superior de acero inoxidable.",
            "Control PID con pantalla LED dual, temporización y protección contra sobretemperatura.",
            "Drenaje eléctrico de un botón en este modelo de dos orificios.",
            "Apagado de seguridad cuando existe escasez de agua.",
            "Operación a temperatura fija, función de temporización y parada automática.",
        ],
        [
            ("Modelo", "WB-1R2H-7"),
            ("Clasificación", "1 fila y 2 orificios"),
            ("Modo de calentamiento", "Transferencia de calor por convección natural del agua"),
            ("Rango de temperatura", "Temperatura ambiente +5 a 100 °C"),
            ("Resolución / fluctuación / uniformidad", "0,1 °C / ±0,5 °C / ±1,0 °C"),
            ("Cámara interior", "Acero inoxidable"),
            ("Carcasa exterior", "Acero laminado en frío con pulverización electrostática"),
            ("Calentador", "Tubo calefactor de acero inoxidable"),
            ("Potencia nominal", "0,5 kW"),
            ("Control y ajuste", "PID · botones táctiles"),
            ("Visualización", "LED dual de 3 dígitos para temperatura medida y programada"),
            ("Temporizador", "0 a 9999 min, con función de espera"),
            ("Funciones adicionales", "Corrección de desviación, bloqueo de menú, respaldo ante fallo eléctrico y memoria de apagado"),
            ("Sensor / seguridad", "NTC / alarma de sobretemperatura y apagado por falta de agua"),
            ("Cámara interior", "300 × 135 × 150 mm"),
            ("Dimensiones exteriores", "318 × 168 × 210 mm"),
            ("Dimensiones de embalaje", "410 × 260 × 300 mm"),
            ("Volumen / carga por bandeja", "6,1 L / 5 kg"),
            ("Número de bandejas", "1"),
            ("Alimentación", "AC 220 V · 2,3 A · 50/60 Hz"),
            ("Peso neto / bruto", "4,5 / 5 kg"),
        ],
    )

    build_sheet(
        ROOT / "public/productos/infitek/pr5-series/ficha-tecnica-es.pdf",
        "PR5-1500",
        "Refrigerador de Farmacia de Tres Puertas PR5-1500",
        "Refrigerador médico de 1500 L para vacunas, medicamentos, reactivos y muestras, con aire forzado y rango de 2 a 8 °C.",
        [
            "Compresor de alta eficiencia y ventilador de refrigeración permanentemente lubricado.",
            "Distribución de aire forzado para estabilidad, uniformidad y recuperación térmica rápida.",
            "Control microprocesado con pantalla digital y ajuste en incrementos de 0,1 °C.",
            "Alarmas audibles y visibles por temperatura alta/baja, error de sensor, puerta abierta y fallo eléctrico.",
            "Cerradura de seguridad, iluminación LED interior, ruedas, patas niveladoras y estantes ajustables.",
        ],
        [
            ("Modelo", "PR5-1500"),
            ("Capacidad", "1500 L"),
            ("Dimensiones internas", "1680 × 595 × 1312 mm"),
            ("Dimensiones exteriores", "1800 × 775 × 1965 mm"),
            ("Rango de temperatura", "2 a 8 °C; opcional 2 a 10 °C o 2 a 14 °C"),
            ("Temperatura ambiente de operación", "10 a 32 °C"),
            ("Variación de temperatura", "±3 °C"),
            ("Sensor / controlador", "NTC / microprocesador"),
            ("Sistema de refrigeración", "Aire forzado"),
            ("Refrigerante", "R134a, libre de CFC"),
            ("Descongelamiento", "Automático"),
            ("Compresor", "SECOP · 1 unidad"),
            ("Pantalla", "Digital"),
            ("Alarmas", "Alta/baja temperatura, error de sensor, puerta abierta y fallo eléctrico"),
            ("Respaldo de alarma", "8 h ante fallo de energía"),
            ("Interior / exterior", "Acero inoxidable grado 304"),
            ("Puerto USB", "Opcional"),
            ("Puerto de alarma remota", "Estándar"),
            ("Orificio de prueba", "Opcional"),
            ("Estantes", "12"),
            ("Emisión sonora", "55 dB"),
            ("Alimentación", "AC 110/220 V ±10 % · 50/60 Hz"),
            ("Consumo", "1065 W"),
            ("Peso neto / bruto", "245 / 280 kg"),
            ("Dimensiones de envío", "1890 × 820 × 2170 mm"),
        ],
    )

    build_sheet(
        ROOT / "public/productos/infitek/titr-50vc/ficha-tecnica-es.pdf",
        "TITR-50VC",
        "Titulador Karl Fischer Volumétrico y Coulométrico TITR-50VC",
        "Sistema combinado para determinar humedad constante y trazas en muestras gaseosas, sólidas y líquidas, con compatibilidad para muestreo por horno.",
        [
            "Pantalla táctil LCD a color de alto contraste de 7 pulgadas.",
            "Valoración Karl Fischer volumétrica y coulométrica en un solo sistema.",
            "Gestión de usuarios, métodos, sensores, titulantes y resultados.",
            "Gestor de solventes con diseño antifugas y antivuelco para el recipiente de residuos.",
            "Ajuste automático o manual de deriva y selección de unidades µg, mg, %, ppm, mg/L y µg/mL.",
            "Hasta 2000 resultados compatibles con GLP y exportación USB en CSV o PDF.",
        ],
        [
            ("Modelo", "TITR-50VC"),
            ("Métodos volumétricos", "Valoración automática, título KF, horno y blanco de horno"),
            ("Métodos coulométricos", "Valoración automática, horno, blanco de horno y corrección de coeficiente"),
            ("Rango de agua volumétrico", "100 µg a 250,0 mg"),
            ("Resolución / repetibilidad volumétrica", "1 µg / ≤0,3 %"),
            ("Rango mV volumétrico", "0 a 2000 mV · resolución 0,1 mV"),
            ("Polarización volumétrica", "1 a 200 µA · exactitud ±3 % · fluctuación ±2,5 %/30 min"),
            ("Rango de agua coulométrico", "3,0 µg a 200 mg"),
            ("Resolución / repetibilidad coulométrica", "0,1 µg / ≤0,3 %"),
            ("Rango mV coulométrico", "0 a 2000 mV · resolución 0,1 mV"),
            ("Polarización coulométrica", "1 a 200 µA · exactitud ±3 % · fluctuación ±2,5 %/30 min"),
            ("Corriente de trabajo", "Exactitud ±0,5 % · fluctuación ±0,2 %/10 min"),
            ("Unidades", "µg, mg, %, ppm, µg/mL y mg/L"),
            ("Gestión de datos", "Hasta 2000 resultados compatibles con GLP"),
            ("Comunicaciones", "RS-232 para impresión · USB para PC, métodos y datos CSV/PDF"),
            ("Periféricos", "Impresora, lector de código, horno y balanza según modelo"),
            ("Gestión GMP", "Requiere software GMP"),
            ("Alimentación", "AC 100 a 240 V · 47 a 63 Hz"),
            ("Dimensiones", "240 × 370 × 270 mm"),
            ("Peso neto", "Aproximadamente 4 kg"),
        ],
        sections=[
            (
                "Elementos incluidos",
                [
                    "Gestor de solventes.",
                    "Bureta de 10 mL.",
                    "Recipiente volumétrico y electrodo de medición.",
                    "Recipiente coulométrico, electrodo de medición y electrodo generador.",
                ],
            )
        ],
    )


if __name__ == "__main__":
    main()

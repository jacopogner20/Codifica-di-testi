<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0">
    <xsl:output method="html" encoding="UTF-8" indent="yes" />
	<xsl:template match="/" >
		<html>
			<head>
				<!--titolo della pagina-->
				<title><xsl:value-of select="//tei:title"/></title>
				<!--documento css-->
				<link rel="stylesheet" href="progetto.css"/>
				<!--documento javascript-->
				<script type="text/javascript" src="progetto.js"></script>
			</head>
			<body>
				<header>
					<!-- titolo -->
					<h1 id="Morf">
						<xsl:value-of select="//tei:sourceDesc/tei:bibl/tei:title"/>
					</h1>
				</header>
				<!-- immagine del manoscritto-->
				<img class="Immagini" src="ms_fr_12_13.jpg" style="display:block"/>
				<img class="Immagini" src="ms_fr_12.jpg" style="display:none"/>
				<img class="Immagini" src="ms_fr_13.jpg" style="display:none"/>
				<button class="pulsante" id="indietro">  &#60; </button>
				<button class="pulsante" id="avanti">  &#62; </button>
				<!--metadati-->
				<div class="metadati">
					<h2>Descrizione del manoscritto</h2>
					<p>Testo preparatorio per almeno tre lezioni tenute all'Università di Ginevra (<xsl:value-of select="//tei:origDate"/>)</p>
					<p>Ubicazione: <xsl:value-of select="//tei:repository"/>, <xsl:value-of select="//tei:settlement"/>, <xsl:value-of select="//tei:country"/></p>
					<p>Autore: <xsl:value-of select="//tei:author"/></p>
					<p>Lingua: <xsl:value-of select="//tei:textLang"/></p>
					<p>Materiale: <xsl:value-of select="//tei:material"/></p>
					<p>Dimensioni: <xsl:value-of select="//tei:height"/> cm. X <xsl:value-of select="//tei:width"/> cm.</p>
					<p>Condizioni del manoscritto: <xsl:value-of select="//tei:condition"/></p>
					<xsl:value-of select="//tei:titleStmt/tei:respStmt[@xml:id='TRADUZIONE']/tei:resp"/>: <xsl:value-of select="//tei:titleStmt/tei:respStmt[@xml:id='TRADUZIONE']/tei:name"/>
					<hr/>
					<!--legenda-->
					<article>
						<h2>Legenda</h2>
						<span class="TermFR" style="border-bottom:2px solid red; cursor:pointer">Termine tecnico</span>&#160;
						<span class="MentFR" style="border-bottom:2px solid blue">Esempio linguistico</span>
						<br/>
						<br/>
					</article>
					<!-- bottone cambio edizione-->
					<input type="button" id="bottoneEdizioni" value="Passa all'edizione interpretativa"></input>
				</div>
				<br/>
				<!--testo originale francese-->
				<div id="testoFra" class="provaTesti">
					<xsl:apply-templates select="//tei:text[@type='source']/tei:body/tei:div/tei:p"/>
				</div>
				<!--testo tradotto in italiano-->
				<div id="testoIta" class="provaTesti">
					<xsl:apply-templates select="//tei:text[@type='translation']/tei:body/tei:div/tei:p"/>
				</div>
				<br/>
				<!-- footer -->
			<footer>
				<xsl:value-of select="//tei:editionStmt/tei:edition"/>
				<xsl:value-of select="//tei:titleStmt/tei:respStmt[@xml:id='CODIFICA']/tei:resp"/>&#160;
				<xsl:value-of select="//tei:titleStmt/tei:respStmt[@xml:id='CODIFICA']/tei:name[@n='1']"/>,
				<xsl:value-of select="//tei:titleStmt/tei:respStmt[@xml:id='CODIFICA']/tei:name[@n='2']"/>
			</footer>
		</body>
	</html>
</xsl:template>
<!--template per il testo francese-->
<xsl:template match="//tei:text[@type='source']/tei:body/tei:div/tei:p[@n='1']">
	<div>
		<h2>Testo originale</h2>
		<xsl:apply-templates/>
	</div>
</xsl:template>
<!-- template per output in riga-->
<xsl:template match="//tei:text[@type='source']/tei:body/tei:div/tei:p/tei:seg/tei:lb">
	<br />
</xsl:template>
<!--template che prende le espansioni e le nasconde-->
<xsl:template match="//tei:expan">
	<span class="espansioni" style="display:none">
  	<xsl:value-of select="."/></span>
</xsl:template>
<!--template che prende le abbreviazioni, le mette nella classe abbreviazioni-->
<xsl:template match="//tei:abbr">
	<span class="abbreviazioni">
  	<xsl:value-of select="."/></span>
</xsl:template>
<!--template che prende le parole "non standard" -->
<xsl:template match="//tei:orig">
	<span class="originale">
  	<xsl:value-of select="."/></span>
</xsl:template>

<!-- template che prende le normalizzazioni -->
<xsl:template match="//tei:reg">
	<span class="normalizzazioni" style="display:none">
  	<xsl:value-of select="."/></span>
</xsl:template>

<!--esempio linguistico in francese-->
<xsl:template match="//tei:mentioned">
  <span class="MentFR ParoleFra" style="border-bottom:2px solid blue">
  <xsl:value-of select="."/></span>
</xsl:template>
<!--termine tecnico in francese-->
<xsl:template match="//tei:term">
  <span class="TermFR ParoleFra" style="border-bottom:2px solid red">
  <xsl:value-of select="."/></span>
</xsl:template>
<!-- template che prende le cancellature-->
<xsl:template match="//tei:del">
  <span class="cancellature" style="text-decoration: line-through">
  <xsl:value-of select="."/></span>
</xsl:template>

<!--template per il testo italiano-->
<xsl:template match="tei:TEI/tei:text/tei:group/tei:text[@type='translation']/tei:body/tei:div/tei:p[@n='3']">
	<div>
		<h2>Testo italiano</h2>
		<xsl:apply-templates/>
	</div>
</xsl:template>
<!-- template che stampa in righe il testo tradotto in italiano -->
<xsl:template match="//tei:text[@type='translation']/tei:body/tei:div/tei:p/tei:seg/tei:lb">
	<br />
</xsl:template>

<!--termine tecnico italiano-->
<xsl:template match="//tei:ref[@type = 'term']">
  <span class="TermFR ParoleIta" style="border-bottom:2px solid red">
  <xsl:value-of select="."/></span>
</xsl:template>

<!--esempio linguistico italiano-->
<xsl:template match="//tei:ref[@type = 'mentioned']">
  <span class="MentFR ParoleIta" style="border-bottom:2px solid blue">
  <xsl:value-of select="."/></span>
</xsl:template>

</xsl:stylesheet>

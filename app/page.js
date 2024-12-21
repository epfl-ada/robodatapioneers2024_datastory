"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
	LoadingSpinner,
	ChartComponent,
	BubbleChartComponent,
} from "./data_charts.js";
import { BoxPlotChart } from "./box_plot_chart.js";
import { LinePlotChart } from "./line_chart.js";
import { BarPlotChart } from "./bar_chart.js";
import { RacingChartComponent } from "./racing_chart.js";
import { HeatMapChart } from "./heatmap.js";
import { NavBar } from "./nav.js";
import { Footer, LandingPage } from "./home_layout.js";
import { IframeChart } from "./iframe_charts.js";
import { BubbleChart } from "./bubble_chart.js";
import { SankeyChart } from "./sankey_chart.js";
import { LineDottedPlotChart } from "./line_chart_dotted.js";
import { worldCupLDA, olympicLDA, nbaLDA } from "./lda_texts.js";

function SubTitleText({ title, text }) {
	return (
		<div className="flex flex-col space-y-2 p-4 max-w-4xl">
			<h2 className="text-2xl font-bold mb-2">{title}</h2>
			<p className="text-lg">{text}</p>
		</div>
	);
}

function Paragraph({ text }) {
	return (
		<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl">
			<p className="text-lg text-left">{text}</p>
		</div>
	);
}

function VariableChooserComponent({ Title, variables, children }) {
	const [selectedVariable, setSelectedVariable] = useState(
		variables[0].datapath
	);

	const handleChange = (e) => {
		setSelectedVariable(e.target.value);
	};

	return (
		<div className="flex flex-col space-y-2 p-4 max-w-4xl">
			<h3 className="text-2xl font-bold mb-2">{Title}</h3>
			{variables.length > 1 && (
				<select
					value={selectedVariable}
					onChange={handleChange}
					className="p-2 border border-gray-300 rounded-md"
				>
					{variables.map((variable, index) => (
						<option key={index} value={variable.datapath}>
							{variable.name}
						</option>
					))}
				</select>
			)}
			{children(selectedVariable)}
		</div>
	);
}

function VariableChooserComponentLDA({ Title, variables, children }) {
	const [selectedVariable, setSelectedVariable] = useState(
		variables[0].datapath
	);

	const handleChange = (e) => {
		setSelectedVariable(e.target.value);
	};

	return (
		<div className="flex justify-center w-full max-w-7xl align-center flex-col">
			<h3 className="text-2xl font-bold mb-2 text-center">{Title}</h3>
			{variables.length > 1 && (
				<select
					value={selectedVariable}
					onChange={handleChange}
					className="p-2 border border-gray-300 rounded-md"
				>
					{variables.map((variable, index) => (
						<option key={index} value={variable.datapath}>
							{variable.name}
						</option>
					))}
				</select>
			)}
			<div className="flex justify-center w-full align-center flex-col">
				{children(selectedVariable)}
			</div>
		</div>
	);
}

function VariableChooserComponentImage({ Title, variables }) {
	const [selectedVariable, setSelectedVariable] = useState(
		variables[0].datapath
	);

	const handleChange = (e) => {
		setSelectedVariable(e.target.value);
	};

	return (
		<div className="flex flex-col space-y-2 p-4 max-w-4xl">
			<h3 className="text-2xl font-bold mb-2">{Title}</h3>
			{variables.length > 1 && (
				<select
					value={selectedVariable}
					onChange={handleChange}
					className="p-2 border border-gray-300 rounded-md"
				>
					{variables.map((variable, index) => (
						<option key={index} value={variable.datapath}>
							{variable.name}
						</option>
					))}
				</select>
			)}
			<Image
				src={selectedVariable}
				alt={Title}
				layout="responsive"
				width={80}
				height={80}
			/>
		</div>
	);
}

export default function Home() {
	return (
		<>
			<NavBar />
			<LandingPage />
			<main className="min-h-screen flex flex-col items-center">
				<div className="flex flex-col space-y-2 p-4 max-w-4xl">
					<h2 className="text-3xl font-bold mb-2">
						Welcome to the Ultimate Sports Analysis Hub on YouTube!
					</h2>
					<p className="text-lg">
						Sports have an unparalleled ability to unite billions of
						fans across the globe. Did you know that the FIFA World
						Cup attracts over half a billion viewers, the Olympics
						engage billions more, and the NBA Finals ignite passions
						in millions every year? These monumental events
						captivate audiences not just in stadiums and arenas, but
						also dominate our digital lives, especially on platforms
						like YouTube. Are you a sports enthusiast eager to dive
						deeper into the game? Or are you curious about how your
						favorite sports moments are shaping the online world?
						You’re in the right place!
					</p>
				</div>
				<SubTitleText
					title="YouTube: The Digital Arena for Sports Fans"
					text="In today's digital landscape, YouTube stands as the premier platform where sports content flourishes. With millions of sports-related videos uploaded each year and billions of views every month, YouTube mirrors the global fervor for sports like no other medium. From electrifying game highlights and in-depth analyses to live streams and passionate fan reactions, the diversity and volume of sports content on YouTube are staggering.

                    Major sporting events trigger a significant surge in YouTube activity. For instance, during the FIFA World Cup, sports channels see a massive influx of views and uploads, reflecting global excitement and engagement. Similarly, the Olympics and NBA Finals generate waves of content that capture every thrilling moment, behind-the-scenes action, and fan interaction. This digital amplification not only enhances the real-time experience of these events but also extends their reach, allowing fans from all corners of the world to participate in the excitement.

                    As sports content on YouTube continues to grow, it becomes a vital indicator of global sports trends and fan interests. Below, our first plot showcases the delta views of various sports channels over the years, illustrating the evolving patterns of viewer engagement."
				></SubTitleText>
				<VariableChooserComponent
					title=""
					variables={[
						{
							datapath:
								"data/first_plot/sum_delta_subs_overtime.csv",
							name: "Delta Subs",
						},
						{
							datapath:
								"data/first_plot/sum_delta_videos_overtime.csv",
							name: "Delta Videos",
						},
						{
							datapath:
								"data/first_plot/sum_delta_views_overtime.csv",
							name: "Delta Views",
						},
					]}
				>
					{(variable) => (
						<LinePlotChart
							datapath={variable}
							colors={["#187F42"]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<Paragraph text="Next, let’s delve into the distribution of different sports within the YouTube community. "></Paragraph>
				<VariableChooserComponent
					title="Line plot of delta view"
					variables={[
						{
							datapath:
								"data/second_plot/fre_popular_sports_tags.csv",
							name: "Delta Subs",
						},
					]}
				>
					{(variable) => (
						<BarPlotChart
							datapath={variable}
							colors={["#165B33"]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl">
					<p className="text-lg text-left">
						Football, basketball, and wrestling reign supreme on
						YouTube, showcasing their immense global popularity and
						passionate fan bases. These sports attract millions of
						views and countless dedicated channels, creating vibrant
						communities where fans engage, share highlights, and
						celebrate their favorite moments!
						<br></br>
						<br></br>
						Now, let’s dive into the most frequently featured
						elements in sports content and discover what truly
						captivates fans around the world! Our Wordcloud
						visualizes the top keywords and trends that drive
						engagement on YouTube.
					</p>
				</div>
				<div>
					<VariableChooserComponentImage
						Title="Wordcloud for all tags in sports videos"
						variables={[
							{
								datapath: "sports_wordcloud.png",
								name: "Word Cloud Image",
							},
						]}
					/>
				</div>
				<p>woeifjoqiwejf</p>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl">
					<p className="text-lg text-left">
						Take a closer look at the word cloud—do you spot words
						like "highlights," "versus," "boxing," "soccer,"
						"league," and "NBA"? These buzzwords vividly capture the
						excitement and competitive spirit that thrive on
						YouTube. They reflect how fans engage with thrilling
						game moments, intense rivalries, and major league
						action, creating a dynamic and energetic sports
						community online. This vibrant mix of terms not only
						showcases what fans are passionate about but also
						highlights how YouTube serves as the ultimate arena
						where the adrenaline of sports competitions comes alive.
						<br></br>
						<br></br>
						Ready to see your favorite moments and topics take
						center stage? This is just the beginning of uncovering
						the electrifying conversations that keep the sports
						world buzzing on YouTube! Stay with us as we continue to
						explore more trends and provide deeper analysis into the
						ever-evolving intersection of sports and digital
						engagement.
					</p>
					<hr className="my-8 border-t-2 border-gray-300" />
				</div>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl">
					<h3 className="text-2xl font-bold mb-2">
						Launching into Our Core Analysis
					</h3>
					<p className="text-lg text-left">
						In this project, we like to answer the following
						research questions:
					</p>
					<ul className="list-disc list-inside text-lg text-left pl-4">
						<li>
							How does YouTube's sports content change over time?
						</li>
						<li>
							How do different major sports events (e.g., World
							Cup, Olympics, NBA Finals) uniquely impact YouTube
							engagement, trends, and general interests in sports
							content? What types of sports-related content tend
							to go viral during major sports events?
						</li>
						<li>
							Which sports gain increased visibility during major
							events? Do minority sports benefit in particular?
						</li>
						<li>
							Do major sports events attract users who are
							non-typical sports audiences on YouTube? How do
							these events influence their engagement levels and
							long-term interest in sports content?
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl">
					<h1 className="text-3xl font-bold mb-2">
						Part 1: General trend
					</h1>
					<p>
						Let’s kick off our analysis by exploring how sports
						content has evolved on YouTube over the years. As our
						first plot shows, the number of sports-related videos
						uploaded per year has generally increased, reflecting a
						growing digital enthusiasm for sports.
					</p>
				</div>
				<VariableChooserComponent
					Title="Number of sport videos per year"
					variables={[
						{
							datapath:
								"data/part_1_plot/sports_videos_per_year.csv",
							name: "Sports videos per year",
						},
					]}
				>
					{(variable) => (
						<LinePlotChart
							datapath={variable}
							colors={["#187F42"]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<h3 className="text-1xl font-bold mb-2">
						Shifting Sentiments in Sports Video Titles
					</h3>
					<p>
						The way sports-related content is framed on YouTube has
						also evolved over time. To better understand this, we
						analyzed the sentiment of video titles, categorizing
						them as positive, negative, or neutral. Interestingly,
						our next plot reveals that the percentage of neutral
						video titles has been steadily increasing over the
						years, suggesting a shift toward more descriptive or
						fact-based content rather than emotionally charged
						titles.
					</p>
				</div>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<Image
						src="data/part_1_plot/sentiment_percentage.png"
						alt="Sentiment percentage"
						layout="responsive"
						width={80}
						height={80}
					/>
				</div>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<Image
						src="data/part_1_plot/trend_sentiment.png"
						alt="Sentiment percentage"
						layout="responsive"
						width={80}
						height={80}
					/>
				</div>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<p>
						To confirm this trend, we performed the Mann-Kendall
						Test, a statistical method for detecting monotonic
						trends over time. The test indicated a significant
						increasing trend in the percentage of neutral video
						titles, with a p-value of 0.001, confirming that this
						shift is unlikely due to random chance. This change
						might reflect evolving content strategies where creators
						focus on informational titles to reach broader
						audiences.
					</p>
				</div>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl">
					<h1 className="text-3xl font-bold mb-2">
						Part 2: Event-Based Analysis
					</h1>
					<p className="text-lg text-left">
						In this part of the analysis, we focus on some of the
						major sports events and their impact on YouTube
						engagement. To accurately pinpoint videos related to
						major sports events, we focused on analyzing video
						titles, as titles are the most effective element for
						capturing audience attention and driving engagement
						compared to tags or descriptions. We began by defining a
						set of keywords specific to each event and then expanded
						these keywords to include various potential combinations
						and synonyms. This comprehensive keyword strategy
						allowed us to gather a robust collection of videos for
						each specific event. By evaluating engagement based on
						video titles, we ensured that our data truly reflects
						the interests and attractions of the audience. This
						method enabled us to effectively categorize and analyze
						the performance of videos tied to significant sports
						events. The following plot illustrates how major sports
						events like the FIFA World Cup, the Olympics, and the
						NBA Finals attract varying levels of viewer interest on
						YouTube. We focused on <b>average view counts</b> as our
						primary metric because our analysis using Spearman
						correlation revealed a strong relationship between view
						counts and other engagement metrics, such as likes and
						dislikes. This high correlation indicates that view
						counts are a reliable indicator of overall engagement,
						allowing us to effectively represent audience interest
						with a single, comprehensive metric.
					</p>
				</div>
				<VariableChooserComponent
					Title="Average view count for videos of different sport events"
					variables={[
						{
							datapath:
								"data/part_2_plot/avg_view_count_sports_events.csv",
							name: "Average view count",
						},
					]}
				>
					{(variable) => (
						<BarPlotChart
							dataPath={variable}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl">
					<p className="text-lg text-left">
						The plot reveals that the <b>FIFA World Cup</b> leads
						with the highest average view counts, followed by the{" "}
						<b>NBA Finals</b>, the <b>Olympics</b>, and other major
						sports events. This ranking highlights the unparalleled
						global appeal of the FIFA World Cup, while the NBA
						Finals and the Olympics also attract substantial viewer
						interest on YouTube. Now that we've identified and
						ranked the most engaging sports events, our focus shifts
						to the video titles for a more comprehensive analysis.
						To uncover the dominant themes and topics that capture
						audience interest, we conducted a{" "}
						<b>Latent Dirichlet Allocation (LDA)</b> analysis on the
						titles of event-related videos. This technique allowed
						us to extract and highlight the highest-ranking themes,
						providing deeper insights into what drives viewer
						engagement during major sports events.
					</p>
				</div>
				<VariableChooserComponentLDA
					Title="Topic modeling LDA"
					variables={[
						{
							datapath: "lda_world_cup_football.html",
							name: "LDA World Cup Football",
						},
						{
							datapath: "lda_olympics.html",
							name: "LDA Olympics",
						},
						{
							datapath: "lda_nba.html",
							name: "LDA NBA",
						},
					]}
				>
					{(variable) => (
						<IframeChart
							src={variable}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponentLDA>
				{worldCupLDA()}
				{olympicLDA()}
				{nbaLDA()}
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<h3 className="text-1xl font-bold mb-2">LDA exploration</h3>
					<p>
						Building on our exploration of key themes identified in
						the LDA clusters, we were also curious to uncover what
						makes certain sports videos go viral on YouTube. To
						achieve this, we created word clouds for the top 10%
						most viewed videos across each major sports event
						analyzed. These visualizations highlight the most
						frequently used words in the titles of highly viewed
						content, revealing the themes and topics that resonate
						most with millions of viewers.
					</p>
				</div>
				<VariableChooserComponentImage
					Title=""
					variables={[
						{
							datapath: "data/word_clouds/world_cup_cloud.webp",
							name: "World cup wordcloud",
						},
					]}
				></VariableChooserComponentImage>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<p>
						Beyond the dominant words like "world," "cup," and
						"FIFA," our word cloud unveils fascinating patterns in
						the most viewed World Cup videos. Notably, the 2018
						World Cup emerges as the most viewed edition compared to
						previous tournaments such as 2014 and 2010, reflecting a
						surge in viewer engagement during this event. Words like
						"match" and "qualifier" indicate that the most popular
						videos are centered around actual games and qualifying
						matches, showcasing the audience’s preference for live
						action and competitive content. Additionally, the
						frequent mention of country names such as France,
						Croatia, Germany, and Argentina highlights the focus on
						teams that reached the final stages, underscoring the
						appeal of high-performing and successful nations. This
						emphasis on key matches and top teams suggests that
						viewers are particularly drawn to content featuring
						pivotal moments and standout performances.
					</p>
				</div>
				<VariableChooserComponentImage
					Title=""
					variables={[
						{
							datapath: "data/word_clouds/olympic_cloud.webp",
							name: "Olympics wordcloud",
						},
					]}
				></VariableChooserComponentImage>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<p>
						Our word cloud analysis for Olympic videos highlights
						key themes such as "2012," "London," "highlights,"
						"women," and "gold." The 2012 London Olympics stands out
						for drawing significant attention, emphasizing the host
						city's impact on the event’s appeal. "Highlights"
						suggests a strong viewer interest in reliving the most
						thrilling moments, while "women" reflects the growing
						recognition of female athletes and their achievements.
						The frequent mention of "gold" points to a universal
						fascination with medal victories and top athletic
						performances.
					</p>
				</div>
				<VariableChooserComponentImage
					Title=""
					variables={[
						{
							datapath: "data/word_clouds/nba_cloud.webp",
							name: "NBA wordcloud",
						},
					]}
				></VariableChooserComponentImage>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<p>
						Our word cloud analysis of NBA-related videos highlights
						key terms such as{" "}
						<strong>
							&quot;Warriors,&quot; &quot;2019,&quot;
							&quot;Cavaliers,&quot;
						</strong>{" "}
						and <strong>&quot;LeBron.&quot;</strong> The prominence
						of &quot;Warriors&quot; and &quot;Cavaliers&quot;
						reflects one of the most iconic rivalries in NBA
						history, driven by multiple intense Finals matchups. The
						frequent mention of &quot;2019&quot; points to the
						dramatic NBA Finals showdown between the{" "}
						<strong>Golden State Warriors</strong> and the{" "}
						<strong>Toronto Raptors</strong>, a highly viewed and
						memorable series.
					</p>
					<p>
						<strong>LeBron James</strong> stands out as a recurring
						figure, emphasizing his role as one of the most
						talked-about players in NBA history. His leadership and
						performances, especially during his time with the
						Cavaliers and Lakers, continue to fuel fan engagement
						and highlight reels.
					</p>
					<h3 className="text-2xl font-bold mb-2">
						Connecting Themes and Virality
					</h3>
					<p>
						Our analysis reveals a strong alignment between the{" "}
						<strong>LDA clusters</strong> and the{" "}
						<strong>word clouds</strong> generated from the most
						viewed sports videos. The dominant themes identified
						through LDA—such as iconic matchups, star players, and
						historic events—are echoed in the word clouds,
						emphasizing how these elements drive engagement and
						define virality on YouTube. From{" "}
						<strong>World Cup qualifiers</strong> and{" "}
						<strong>Olympic gold medal moments</strong> to{" "}
						<strong>NBA Finals rivalries</strong>, it’s clear that
						fans are drawn to competitive stories, unforgettable
						performances, and emotionally charged narratives. This
						synergy between structured analysis and visual
						representation highlights the shared patterns that make
						sports content a global sensation on YouTube.
					</p>
					<h3 className="text-2xl font-bold mb-2">
						Statistical Analysis: Comparing Event-Related and
						Non-Event Videos
					</h3>
					<p>
						To deepen our understanding of how major sports events
						impact YouTube engagement, we conducted a statistical
						comparison between event-related and non-event videos
						uploaded during the same timeframe. Since the data
						distribution was not normal, we employed the{" "}
						<strong>Mann–Whitney U test</strong>, a non-parametric
						statistical method suitable for comparing two
						independent samples.
					</p>
					<p>
						Our analysis focused on three major events:{" "}
						<strong>Olympics 2016</strong>,{" "}
						<strong>FIFA World Cup 2018</strong>, and{" "}
						<strong>NBA Finals 2019</strong>. We compared the{" "}
						<strong>delta_views</strong> (the change in view counts)
						between videos directly related to these events and
						unrelated sports videos uploaded during the same period.
					</p>
					<p>
						The results showed{" "}
						<strong>p-values less than 0.05</strong> for all three
						events, indicating a{" "}
						<strong>statistically significant difference</strong>{" "}
						between event-related and non-event-related videos. This
						finding confirms that videos linked to major sports
						events experience notably higher viewership compared to
						general sports content. The substantial increase in
						engagement highlights the powerful influence of global
						sports events in shaping online content consumption,
						reinforcing YouTube’s role as a dynamic platform for
						real-time sports coverage and fan interaction.
					</p>
				</div>
				fqoijfoqwjefi
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<h1 className="text-3xl font-bold mb-2">
						<strong>Part 3: Sport-Specific Focus</strong>
					</h1>
					<p>
						In this part, we focus on sports and analyze our third
						question: &quot;Which sports gain increased visibility
						during major events?&quot;
					</p>
					<h3 id="each-sport-content-count-transition">
						Each sport content count transition
					</h3>
					<p>
						First, the following chart visualizes the number of
						video uploads for each sport on YouTube over time.
					</p>
				</div>
				<RacingChartComponent
					dataPath={"data/third_plot/sport_transit.csv"}
					xName={"Number of videos"}
					yName={"Sport category"}
					loading={<LoadingSpinner />}
				/>
				<div></div>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<p>
						Interesting observation includes that between 2005 and
						2012, hockey dominated YouTube, driven by major events
						like the NHL playoffs and Stanley Cup Finals, which
						generated significant engagement, particularly in North
						America. However, from 2013 onwards, football (soccer)
						content began to outpace hockey due to the growing
						global popularity of football, fueled by major
						international events like the FIFA World Cup (2010,
						2014) and the UEFA Champions League. These global
						tournaments attracted massive viewership, especially
						from regions such as Asia, Africa, and the Middle East,
						and led to a surge in football-related content on
						YouTube, including highlights, fan reactions, and
						tactical analyses.
					</p>
					<p>
						Football&#39;s global appeal, combined with the
						increasing accessibility of YouTube, played a crucial
						role in this shift. International football events
						generated continuous streams of content, keeping fans
						engaged year-round. Additionally, top European leagues
						like the Premier League and La Liga contributed to the
						volume of football content, particularly during
						high-profile matches. The rise of mobile viewing and
						better internet infrastructure further supported
						football’s dominance on YouTube.
					</p>
					<p>
						Therefore, the shift from hockey to football can be
						attributed to football’s growing global reach, driven by
						major sports events and YouTube’s expanding role as a
						hub for sports content. These events sparked consistent
						engagement, leading to football&#39;s dominance on the
						platform.
					</p>
				</div>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<h3 className="text-1xl font-bold mb-2">
						Difference in difference
					</h3>
					<p>
						We investigated how specific sports events contribute to
						engagement on YouTube using Difference-in-Differences
						(DID). The analysis focused on data from 2017-2018, a
						period when YouTube was becoming more mature. We
						examined how the delta_view (change in views) of videos
						in the period before and after sports events changed for
						five sports: football, skiing, basketball, hockey, and
						rugby. The corresponding events were: FIFA 2018, Winter
						Olympics 2018, NBA Finals 2018, Stanley Cup Finals 2018,
						and Rugby World Cup Sevens 2018. The control group was
						the average delta_view of videos from sports unrelated
						to the events, and the sport group was the average
						delta_view of videos related to the event in question.
					</p>
					<p>
						The key finding is that not all sports events contribute
						to increased engagement in their respective sports.
					</p>
					<p>
						<strong>Football and Skiing:</strong>
						These two sports show the most significant impact from
						their events, as the graphs clearly demonstrate.
						However, when examining the p-values, football shows all
						p-values below 0.05, indicating a strong, positive
						impact from the FIFA 2018 event, with statistically
						significant coefficients for both the treatment and
						interaction terms. On the other hand, skiing shows a
						weaker and less consistent pattern, with the Winter
						Olympics having little effect on engagement and no
						significant interaction term. It&#39;s important to note
						that for this DID analysis, we examined the data for 4
						months before and 4 months after the events. Therefore,
						we can conclude that user engagement for skiing did not
						sustain for long after the Winter Olympics.
					</p>
					<p>
						<strong>Basketball, Hockey, and Rugby:</strong>
						For these sports, the events did not show a substantial
						increase in engagement. Particularly surprising was the
						lack of change in engagement after the NBA Finals.
						Despite the large number of basketball-related videos,
						there was no noticeable shift in engagement. This could
						be due to the NBA Finals being a U.S.-centric event, not
						a global competition, and since it is a culmination of
						the season, engagement may not increase significantly
						afterward. For hockey, the post-event engagement
						actually decreased, which is puzzling. This could be
						because the Stanley Cup Finals took place in June, a
						time when interest in winter sports, like hockey,
						typically wanes, suggesting that the timing of the event
						is critical in sustaining user interest.
					</p>
					<p>
						From these findings, it is clear that sports events do
						not always affect engagement on YouTube. However, for
						sports like football and skiing, the effect was
						noticeable. Additionally, it can be concluded that for
						minor-sports to capture more attention, the event needs
						to be held on a global scale and during an appropriate
						season for the sport.
					</p>
				</div>
				<VariableChooserComponentImage
					Title=""
					variables={[
						{
							datapath: "data/diff_in_diff/basketball_DID.png",
							name: "Basketball DID",
						},
						{
							datapath: "data/diff_in_diff/football_DID.png",
							name: "Football DID",
						},
						{
							datapath: "data/diff_in_diff/hockey_DID.png",
							name: "Hockey DID",
						},
						{
							datapath: "data/diff_in_diff/rugby_DID.webp",
							name: "Rugby DID",
						},
						{
							datapath: "data/diff_in_diff/skiing_DID.png",
							name: "Skiing DID",
						},
					]}
				/>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<h1 className="text-3xl font-bold mb-2">
						<strong>Part 4: User Engagement Over Time</strong>
					</h1>
					<p>
						This section tracks how each user’s engagement with
						videos of various sports changed over time using comment
						data.
					</p>
					<p>
						By integrating comment data with video metadata, we
						quantified each user’s level of interest in different
						sports (representing each user as a vector of interest
						levels for each sport) and identified when and on which
						sports videos they commented. For instance, we can track
						how users showed interest in and commented on soccer
						videos before, during, and after the FIFA 2018 Olympics.
					</p>
					<p>
						In this analysis, we focused on three major single-sport
						events on YouTube up to 2019: the 2018 FIFA World Cup
						(soccer), the 2019 NBA Finals (basketball), and the 2015
						Floyd Mayweather vs. Manny Pacquiao fight (boxing).
						Multi-sport events like the Olympics were excluded to
						avoid overlapping influences from different sports.
					</p>
					<p>
						For each analysis, users were classified into three
						groups based on their level of interest in the sport:
					</p>
					<ol>
						<li>
							<strong>“Often” group</strong>: Users who commented
							mostly on videos of that sport, indicating they are
							likely devoted fans.
						</li>
						<li>
							<strong>“Sometimes” group</strong>: Users who
							occasionally commented on that sport’s videos but
							also engaged with other sports, showing moderate
							interest.
						</li>
						<li>
							<strong>“Seldom” group</strong>: Users who never
							commented on that sport’s videos, implying little to
							no interest.
						</li>
					</ol>
					<p>
						The analysis examines how these groups changed over
						time—before (“before”), during (“during”), and after
						(“after”) each event—and how users moved between groups.
						The findings are based on a dataset of 8.6 billion
						comments.
					</p>
				</div>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<h2 className="text-2xl font-bold mb-2">
						FIFA World Cup 2018 Analysis
					</h2>
					<p>
						In the FIFA World Cup analysis, the largest group,
						represented in green, consisted of users who did not
						comment on soccer videos at all during the period,
						indicating little interest in soccer. The orange group
						represented users with moderate interest, while the blue
						group comprised highly interested soccer fans. The
						results show that the number of highly engaged soccer
						fans (blue group) remained steady throughout the event.
						However, the moderately interested group (orange) nearly
						doubled, with most users coming from the previously
						uninterested group (green). This suggests that the World
						Cup attracted attention not only from soccer fans but
						also from users who typically didn’t watch soccer. This
						trend aligns with the phenomenon of sports bars filling
						up with casual viewers during the World Cup. However, by
						the end of the event, the number of users in the orange
						and blue groups returned to pre-event levels. This
						indicates that while the World Cup temporarily sparked
						interest in soccer among new users, it did not lead to a
						lasting increase in engagement.
					</p>
					<p>
						The second and third analyses focus on the 2019 NBA
						Finals. Here, the meanings of the green, orange, and
						blue groups remain the same. Similar to the FIFA World
						Cup analysis, the NBA Finals succeeded in attracting
						attention from users who typically had no interest in
						basketball during the event. However, once the event
						concluded, these users lost interest in the sport again.
						These findings indicate that while major events can
						temporarily draw users’ attention to a sport, their
						impact is short-lived and does not lead to sustained
						interest. From the perspective of promoting a sport,
						relying solely on high-profile events to capture users’
						interest is insufficient. In this analysis, videos were
						simply selected based on their sports-related tags. For
						future work, we plan to conduct a more detailed
						classification of videos to achieve more refined
						analytical results.
					</p>
				</div>
				<VariableChooserComponent
					Title="User comment flow chart for soccer before and after World Cup 2018"
					variables={[
						{
							datapath: "data/sankey_plot/sankey_diagram_.json",
							name: "Sankey soccer",
						},
						{
							datapath:
								"data/sankey_plot/sankey_diagram_basketball_2019.json",
							name: "Sankey basketball",
						},
						{
							datapath:
								"data/sankey_plot/sankey_diagram_boxing_2015.json",
							name: "Sankey boxing",
						},
					]}
				>
					{(variable) => (
						<SankeyChart
							dataPath={variable}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<div className="flex flex-col space-y-2 p-4 w-full max-w-4xl  text-lg text-left">
					<h2 className="text-2xl font-bold mb-2">Conclusion </h2>
					<p>
						In conclusion, our analysis highlights the dynamic
						relationship between major sports events and YouTube
						engagement, revealing how global competitions spark
						temporary surges in user activity and content creation.
						While events like the FIFA World Cup, the NBA Finals,
						and the Olympics generate massive viewership and
						increased content uploads, their influence on long-term
						engagement appears limited. Viewers often return to
						pre-event interest levels after the events conclude,
						indicating that while major sports events capture broad
						and diverse audiences, sustaining engagement requires
						more than just occasional global spectacles.
						Additionally, the evolving nature of sports video
						titles, shifting toward more neutral and informative
						content, reflects changes in creators’ strategies aimed
						at appealing to a wider audience. By connecting user
						engagement trends with content dynamics, our findings
						provide valuable insights into how digital platforms
						like YouTube mirror and shape real-world sports culture,
						fostering both momentary excitement and enduring fan
						communities.
					</p>
				</div>
				<SubTitleText
					title="Create Next App"
					text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam autem quibusdam, delectus in corrupti, ab impedit magni iure eveniet aliquid soluta neque quisquam ducimus dolores ex suscipit pariatur. Voluptatibus, exercitationem? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis repellat iure tenetur similique nemo soluta velit voluptate."
				/>
				<SubTitleText
					title="Create Next App"
					text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam autem quibusdam, delectus in corrupti, ab impedit magni iure eveniet aliquid soluta neque quisquam ducimus dolores ex suscipit pariatur. Voluptatibus, exercitationem? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis repellat iure tenetur similique nemo soluta velit voluptate."
				/>
				<BubbleChartComponent loading={<LoadingSpinner />} />
				<VariableChooserComponent
					Title="Box plot of delta view"
					variables={[
						{
							datapath: "data/boxplot_data.csv",
							name: "Views",
						},
						{
							datapath: "data/boxplot_data2.csv",
							name: "Videos",
						},
					]}
				>
					{(variable) => (
						<BarPlotChart
							datapath={variable}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<VariableChooserComponent
					Title="Line plot of delta view"
					variables={[
						{
							datapath: "data/barplot_data.csv",
							name: "Delta Subs",
						},
					]}
				>
					{(variable) => (
						<BarPlotChart
							datapath={variable}
							colors={[
								"#165B33",
								"#FF5733",
								"#33FF57",
								"#3357FF",
							]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<VariableChooserComponentLDA
					Title="Topic modeling LDA"
					variables={[
						{
							datapath: "lda_world_cup_football.html",
							name: "LDA World Cup Football",
						},
						{
							datapath: "lda_olympics.html",
							name: "LDA Olympics",
						},
						{
							datapath: "lda_nba.html",
							name: "LDA NBA",
						},
					]}
				>
					{(variable) => (
						<IframeChart
							src={variable}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponentLDA>
				<VariableChooserComponent
					Title="Line plot of delta view"
					variables={[
						{
							datapath:
								"data/second_plot/fre_popular_sports_tags.csv",
							name: "Delta Subs",
						},
					]}
				>
					{(variable) => (
						<HeatMapChart
							datapath={variable}
							colors={["#165B33"]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<VariableChooserComponent
					Title="User comment flow chart for soccer before and after World Cup 2018"
					variables={[
						{
							datapath: "data/sankey_plot/sankey_diagram_.json",
							name: "Sankey soccer",
						},
					]}
				>
					{(variable) => (
						<SankeyChart
							dataPath={variable}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<VariableChooserComponent
					Title="Line plot of delta view"
					variables={[
						{
							datapath: "data/lineplot_data.csv",
							name: "LIne Chart",
						},
					]}
				>
					{(variable) => (
						<LineDottedPlotChart
							datapath={variable}
							colors={[
								"#165B33",
								"#FF5733",
								"#33FF57",
								"#3357FF",
							]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
			</main>
			<Footer />
		</>
	);
}

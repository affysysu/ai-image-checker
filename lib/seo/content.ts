export interface ContentSection {
  heading: string;
  content: string;
  headingLevel?: 2 | 3;
}

export interface CrossLink {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageContent {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  contentSections: ContentSection[];
  crossLinks: CrossLink[];
  faqs: FaqItem[];
}

const siblingPages: CrossLink[] = [
  { label: 'Free AI Image Checker', href: '/check' },
  { label: 'AI Image Checker', href: '/ai-image-checker' },
  { label: 'AI Image Detector', href: '/ai-image-detector' },
  { label: 'Detect AI Generated Images', href: '/detect-ai-generated-image' },
  { label: 'Is This AI Generated?', href: '/is-this-ai-generated' },
];

function crossLinksExcluding(currentPath: string): CrossLink[] {
  return siblingPages.filter((p) => p.href !== currentPath).slice(0, 3);
}

// ── /check — "free AI image checker" ─────────────────

const checkContent: PageContent = {
  eyebrow: 'Free browser-based detector',
  title: 'Free AI Image Checker',
  description: 'Upload an image or paste a URL to run a multi-engine AI image check — no sign-up required.',
  path: '/check',
  contentSections: [
    {
      heading: 'What is a free AI image checker?',
      content:
        'A free AI image checker is a tool that analyzes uploaded images and estimates the probability that they were created by generative AI models such as Midjourney, DALL·E, Stable Diffusion, or Firefly. Unlike manual inspection — where a reviewer looks for telltale artifacts like inconsistent lighting, warped hands, or unnatural textures — an automated checker uses multiple detection engines that examine pixel-level patterns, compression signatures, and metadata clues in parallel. This tool runs four independent detection adapters and combines their scores into a single weighted probability. Because the analysis happens in your browser and on demand, there is no queue, no account requirement, and no cost for core detection. The goal is to give you a transparent, data-informed estimate rather than a binary yes-or-no label, so you can decide how much weight to give the result in your own context.',
    },
    {
      heading: 'How to use the free checker',
      content:
        'Using the checker takes three steps. First, upload a supported image file — JPG, PNG, WebP, or GIF up to 20MB — or paste a public HTTPS image URL into the URL field and click "Analyze URL." Second, wait a few seconds while the engines process the image. Each engine runs independently and returns a probability score between 0 (likely human-made) and 100 (likely AI-generated). Third, review the result card. It shows the composite AI probability score, a confidence label (High / Medium / Low), each engine\'s individual score on a visual track bar, and a short explanation of what the numbers mean. If the engines disagree significantly, the confidence label will reflect that uncertainty rather than hiding it. You can also check recent results in the local history panel below the upload zone — nothing is stored on a server, so history lives only in your browser.',
    },
    {
      heading: 'Understanding score ranges',
      content:
        'The composite score falls into three broad ranges, each with a practical interpretation. Scores from 0 to 30 suggest the image is likely authentic — either a photograph taken with a conventional camera or artwork created without generative AI tools. Scores from 31 to 70 fall into the uncertain zone, where engine signals are mixed or individual scores are close to the decision boundary. In this range, the tool recommends treating the result as a review signal rather than a conclusion. Scores from 71 to 100 indicate a high probability that the image was AI-generated. Even in this range, results are probabilistic — edited, compressed, or low-resolution images can produce misleading scores. For the most reliable reading, use the highest-quality version of the image available and compare the engine-by-engine breakdown rather than relying on the composite number alone.',
    },
    {
      heading: 'Why engine diversity matters',
      content:
        'A single detection model can be biased toward the training data it was exposed to. One engine might be excellent at spotting Stable Diffusion outputs but weaker on Midjourney v6 images, while another might excel at detecting GAN-based generations but struggle with diffusion models. By running four engines in parallel and weighting their outputs, this checker reduces reliance on any single model\'s blind spots. The engine-by-engine breakdown in the result card lets you see exactly how much each engine contributed to the final score. When all four engines agree — all high or all low — confidence is high. When two engines say 90% and two say 10%, the tool labels the result uncertain and encourages manual review. This transparency is the core value proposition: you see the evidence, not just the verdict.',
    },
  ],
  crossLinks: crossLinksExcluding('/check'),
  faqs: [
    {
      question: 'Do I need to create an account to use the free AI image checker?',
      answer:
        'No. Core detection is free and requires no sign-up. You can upload an image or paste a URL and get results immediately. Optional accounts unlock additional features, but the detector itself works without authentication.',
    },
    {
      question: 'What happens to my image after I check it?',
      answer:
        'Images are analyzed for the current request only. The tool does not store uploaded originals on any server after processing completes. Recent results are saved locally in your browser for convenience and can be cleared at any time.',
    },
    {
      question: 'Which image formats produce the most accurate results?',
      answer:
        'Uncompressed or lightly compressed PNG and high-quality JPEG files generally yield the most reliable scores. Heavily compressed images, thumbnails, or screenshots of screenshots can introduce artifacts that confuse detection engines and lower confidence.',
    },
  ],
};

// ── /ai-image-checker — "AI image checker" ───────────

const aiImageCheckerContent: PageContent = {
  eyebrow: 'AI image checker',
  title: 'AI Image Checker',
  description: 'Run a fast AI probability analysis with engine-by-engine transparency and weighted scoring.',
  path: '/ai-image-checker',
  contentSections: [
    {
      heading: 'Why use a multi-engine AI image checker?',
      content:
        'Most AI image detectors on the market rely on a single model trained on a specific dataset. That approach has a fundamental weakness: if the training data underrepresented a particular generator — say, Flux or Midjourney v6 — the model may produce confident but wrong answers for those images. A multi-engine checker mitigates this by running several detection adapters in parallel, each with different architectural assumptions and training backgrounds. The composite score reflects agreement across engines rather than the opinion of one model. When engines agree, you get high confidence. When they disagree, the checker transparently reports low confidence instead of guessing. This design philosophy — evidence over assertion — makes the tool suitable for educators reviewing student submissions, journalists verifying sources, moderators screening user-generated content, and anyone who needs to document the reasoning behind a detection decision.',
    },
    {
      heading: 'Who uses an AI image checker?',
      content:
        'AI image checkers serve a diverse range of users. Teachers and academic staff use them to screen image-based assignment submissions for AI-generated content, though results should complement — not replace — academic judgment. Journalists and fact-checkers use them to assess whether viral social media images might be synthetic, especially during breaking news events when misattributed AI images spread quickly. Content moderators and community managers use detection scores as one signal in a broader moderation toolkit. Digital artists and photographers use them defensively — to demonstrate that their own work is human-made when questioned. E-commerce platforms and marketplaces use them to verify product images submitted by sellers. In every case, the checker is a review signal, not a final arbiter. The score should be weighed alongside context, source credibility, and human judgment.',
    },
    {
      heading: 'How the composite score is calculated',
      content:
        'Each of the four detection engines returns a raw probability between 0 and 100. The scoring layer applies per-engine weights that reflect relative reliability based on benchmark performance, then combines them into a weighted average. The confidence label — High, Medium, or Low — is derived from the spread between engine scores. A tight cluster of similar scores produces high confidence; wide divergence produces low confidence. This is different from a simple averaging approach because it explicitly surfaces disagreement. An image that gets scores of 52, 48, 55, and 50 is genuinely uncertain (all engines hover near the boundary), while an image that gets 95, 92, 10, and 8 has two engines that are very confident in opposite directions — also uncertain, but for a different reason. The result card shows both the composite and the individual engine tracks so you can see which scenario applies.',
    },
    {
      heading: 'Limitations to keep in mind',
      content:
        'No AI image detector — commercial or open-source — achieves 100% accuracy. Detection becomes harder as generators improve and as images are compressed, resized, or edited after generation. An AI-generated image that has been heavily filtered, cropped, or re-saved at low quality may produce a low AI probability score simply because the telltale patterns were degraded. Conversely, a genuine photograph with heavy noise reduction or AI-based upscaling applied may trigger false positives. The checker is most reliable with original-resolution, minimally processed images. For high-stakes decisions — such as content moderation appeals, academic integrity cases, or legal evidence — use detection results as one input among several and document the full engine-by-engine breakdown.',
    },
  ],
  crossLinks: crossLinksExcluding('/ai-image-checker'),
  faqs: [
    {
      question: 'How is this different from a free single-engine detector?',
      answer:
        'Single-engine detectors give you one model\'s opinion. This tool runs four engines in parallel and shows you the agreement (or disagreement) between them. The composite score and confidence label give you a more nuanced picture than a binary AI-or-not answer.',
    },
    {
      question: 'Can I trust a high-confidence AI-generated result?',
      answer:
        'A high-confidence result means all four engines independently agree on a high AI probability. While this is a strong signal, it is not proof. Always consider the image source, context, and any post-processing that may have been applied.',
    },
    {
      question: 'Does the tool work on mobile devices?',
      answer:
        'Yes. The checker is fully responsive and works on mobile browsers. You can upload images from your phone\'s camera roll or photo library. The detection engines run server-side, so mobile performance depends on your network connection rather than your device\'s processing power.',
    },
  ],
};

// ── /ai-image-detector — "AI image detector" ─────────

const aiImageDetectorContent: PageContent = {
  eyebrow: 'AI image detector tool',
  title: 'AI Image Detector',
  description: 'Upload a photo or paste a URL to detect AI-generated images with multi-engine analysis.',
  path: '/ai-image-detector',
  contentSections: [
    {
      heading: 'How an AI image detector works',
      content:
        'An AI image detector examines digital images for statistical patterns, artifacts, and structural signatures that generative models leave behind. Modern AI image generators — including GANs, diffusion models, and consistency models — produce images through a process that is fundamentally different from a camera sensor or a human artist\'s brush. These differences manifest at the pixel level as subtle correlations, frequency-domain anomalies, and noise patterns that are invisible to the human eye but detectable by trained machine learning models. This detector runs four independent engines that each approach the problem from a different angle. One engine specializes in diffusion-model artifact detection, another focuses on frequency-domain analysis, a third examines compression and metadata signatures, and the fourth provides a general-purpose AI-vs-human classification. By combining these complementary perspectives, the detector achieves more robust performance than any single engine could alone.',
    },
    {
      heading: 'Understanding detection confidence levels',
      content:
        'Confidence in AI image detection is not a single number — it is a measure of how much the independent engines agree. When all four engines return scores that cluster tightly together (for example, 85, 88, 82, and 90), the system reports High confidence because the signal is consistent across methods. When scores spread widely (for example, 95, 40, 70, and 20), the system reports Low confidence — not because the detection failed, but because the evidence is genuinely mixed. This transparency is critical for real-world use. A "Likely AI — Low Confidence" result tells a very different story from "Likely AI — High Confidence," and responsible users should treat them differently. The confidence label is not a measure of the tool\'s overall accuracy; it is specific to each individual image and reflects the degree of engine consensus for that particular analysis.',
    },
    {
      heading: 'Practical use cases for AI image detection',
      content:
        'AI image detection has moved from research curiosity to practical necessity across multiple domains. In education, instructors use detectors to screen image-based homework and art submissions, establishing a baseline for further review rather than making automated decisions. In journalism, newsrooms use detectors to assess user-submitted photos and social media images before publication, reducing the risk of amplifying synthetic media. In e-commerce, marketplace platforms use detection to verify that product photos show real items rather than AI-generated mockups. In intellectual property, rights holders use detectors to identify potentially infringing AI-generated derivatives of protected works. In content moderation, platform teams use detection scores alongside other signals — account age, posting patterns, user reports — to prioritize review queues. In each case, the detector functions as a triage and evidence-gathering tool, not as an automated judge.',
    },
    {
      heading: 'Privacy and data handling',
      content:
        'Images uploaded to this detector are processed in memory for the duration of the analysis request and are not persistently stored on disk or in cloud storage. The tool does not use uploaded images to train or improve detection models. There is no human review queue where staff might view your images. After processing completes, the original image data is discarded. Detection results are returned to your browser and optionally saved in local storage for your convenience — this data never leaves your device. For users handling sensitive, confidential, or proprietary images, this privacy-first architecture means you can use the detector without exposing content to third-party storage, training pipelines, or manual review workflows. The trade-off is that there is no server-side history or cross-device sync for free-tier users.',
    },
  ],
  crossLinks: crossLinksExcluding('/ai-image-detector'),
  faqs: [
    {
      question: 'What is the difference between an AI image detector and an AI image checker?',
      answer:
        'The terms are used interchangeably in practice. Both refer to tools that analyze images and estimate whether they were AI-generated. This site uses both terms to serve different search intents, but the underlying detection engine and methodology are identical across all pages.',
    },
    {
      question: 'Can the detector identify which AI model created an image?',
      answer:
        'Not reliably. While some engines show higher activation for specific generator families (e.g., Midjourney vs. Stable Diffusion), the detector reports an overall AI probability rather than attributing the image to a particular model. Attribution is an active research area with lower reliability than detection.',
    },
    {
      question: 'How often are the detection engines updated?',
      answer:
        'The detection engines are updated periodically as improved models become available. The multi-engine architecture means individual engines can be swapped or upgraded without changing the overall detection flow. Check the documentation or changelog for specific update timelines.',
    },
  ],
};

// ── /detect-ai-generated-image — "detect AI generated images" ──

const detectAiGeneratedContent: PageContent = {
  eyebrow: 'How to detect AI-generated images',
  title: 'Detect AI Generated Images',
  description: 'Use the detector first, then review the score, engine spread, and confidence label.',
  path: '/detect-ai-generated-image',
  contentSections: [
    {
      heading: 'Step 1: Choose your image',
      content:
        'Start by selecting the image you want to analyze. You have two options. The first is file upload: click or tap the upload zone, or drag and drop an image file directly onto the dashed area. Supported formats include JPG, PNG, WebP, and GIF, with a maximum file size of 20MB. For best results, use the highest-quality version of the image you have access to — avoid screenshots of images when the original file is available, since re-encoding introduces artifacts that can confuse detection engines. The second option is URL analysis: if the image is already publicly accessible on the web, paste its HTTPS URL into the text field and click "Analyze URL." The server will fetch the image directly, which can be faster than downloading and re-uploading. URL analysis is especially useful for checking images you find on social media, news sites, or marketplace listings without saving them to your device first.',
    },
    {
      heading: 'Step 2: Review the engine-by-engine breakdown',
      content:
        'Once processing completes — typically within a few seconds — the result card appears. The most important section is not the composite score at the top, but the engine-by-engine breakdown below it. Each of the four detection engines displays its individual score on a horizontal track bar with a numeric label. Look at the spread between the highest and lowest engine scores. If all four bars cluster near the same value, the result is internally consistent and the confidence label will reflect that. If the bars span a wide range — for example, one engine at 95 and another at 15 — the result is inconsistent, and you should treat the composite score with caution regardless of what number it shows. The engine names are displayed alongside their scores so you can track which engines tend to agree or disagree over multiple checks. Over time, you may develop intuition about which engines are more conservative or more aggressive in their scoring for the types of images you typically analyze.',
    },
    {
      heading: 'Step 3: Interpret the confidence label',
      content:
        'The confidence label — High, Medium, or Low — is the single most actionable piece of information on the result card. It is not a measure of how sure the tool is about its own accuracy; it is a measure of how much the four independent engines agree on this specific image. High confidence means the engines produced consistent scores. Medium confidence means there is moderate spread — the composite score is still useful but should be weighted less heavily in your decision. Low confidence means the engines disagree substantially, and the composite score may be misleading. In low-confidence cases, the best course of action is to seek additional evidence: check the image source, look for metadata, examine the image at full resolution for visual artifacts, or run the image through additional detection tools. Never treat a low-confidence result as definitive in either direction.',
    },
    {
      heading: 'Step 4: Use results responsibly',
      content:
        'AI image detection is probabilistic, not deterministic. A score of 95 does not guarantee the image is AI-generated; a score of 5 does not guarantee it is human-made. Detection accuracy varies by generator model, image quality, post-processing, and the specific characteristics of each image. Edited or compressed images are particularly challenging — a real photo that has been run through an AI enhancer or denoiser may score high on AI probability because the enhancement process leaves patterns similar to those of generative models. Conversely, an AI-generated image that has been heavily downscaled or filtered may score low because the telltale artifacts were stripped away. Use detection results as one input in a broader assessment. For academic integrity, combine detection scores with metadata analysis, student interviews, and assignment context. For journalism, verify the image source and cross-reference with other evidence. For content moderation, use detection scores alongside user history and other trust signals. The most responsible users of AI detection tools are those who understand their limitations.',
    },
  ],
  crossLinks: crossLinksExcluding('/detect-ai-generated-image'),
  faqs: [
    {
      question: 'Can AI detection results be used as evidence in academic integrity cases?',
      answer:
        'Detection results can be used as a screening signal, but should not be the sole basis for an academic integrity decision. Best practice is to combine the detection report with metadata analysis, discussion with the student, and review of the assignment context.',
    },
    {
      question: 'Why do different detection tools give different results for the same image?',
      answer:
        'Different tools use different models trained on different datasets with different architectural assumptions. Even this tool\'s four internal engines sometimes disagree. Cross-tool variation is expected and is one reason why multi-engine transparency is valuable.',
    },
    {
      question: 'Does editing an AI-generated image make it harder to detect?',
      answer:
        'Yes. Cropping, resizing, filtering, re-compressing, or overlaying text can degrade or remove the pixel-level patterns that detection engines rely on. Deliberately adversarial techniques like adding noise or re-encoding at low quality can further reduce detectability.',
    },
  ],
};

// ── /is-this-ai-generated — "is this AI generated" ───

const isThisAiGeneratedContent: PageContent = {
  eyebrow: 'Question-style AI detector',
  title: 'Is This AI Generated?',
  description: 'Paste the image, run the check, and treat the result as a transparent review signal.',
  path: '/is-this-ai-generated',
  contentSections: [
    {
      heading: 'How to tell if an image is AI-generated',
      content:
        'The question "is this AI generated?" has become increasingly common as generative AI tools produce images that are difficult to distinguish from photographs and human-made art. There are several approaches to answering this question, each with different strengths. Visual inspection — looking for anatomical errors, inconsistent lighting, unnatural textures, or garbled text — works for obvious cases but is unreliable for high-quality generations. Metadata analysis — checking EXIF data for camera information, software tags, or generation parameters — can provide strong evidence but is often stripped when images are uploaded to social media. Reverse image search can help establish provenance by finding earlier appearances of the image online. AI-powered detection, like the tool on this page, provides a quantitative probability score by analyzing pixel-level patterns that are invisible to the human eye. The most reliable approach combines all of these methods: use the detector for a fast probability estimate, check any available metadata, and apply your own visual judgment before reaching a conclusion.',
    },
    {
      heading: 'Reading the result card',
      content:
        'When you upload an image or submit a URL, the result card presents several pieces of information in order of importance. At the top, a large numeric score shows the composite AI probability from 0 to 100, color-coded: red for likely AI-generated (71-100), amber for uncertain (31-70), and green for likely human-made (0-30). Next to the score, a confidence label (High / Medium / Low) tells you how consistently the engines agreed. Below that, a short explanation paragraph translates the numbers into plain language — for example, "Multiple detection engines strongly agree this image shows patterns consistent with AI generation." Further down, the engine-by-engine section shows each individual engine\'s score on a visual track bar, so you can see which engines drove the composite score and whether any engines dissented. At the bottom, action buttons let you run a new check or clear the current result.',
    },
    {
      heading: 'Why AI detection is not a verdict',
      content:
        'It is important to understand what AI image detection can and cannot do. It can identify statistical patterns that are statistically associated with AI-generated images in the detection models\' training data. It cannot trace the actual provenance of an image, verify whether a specific person created it with a specific tool on a specific date, or provide legally admissible proof of origin. The output is a probability estimate based on pattern matching, not a forensic conclusion. This distinction matters in practice. If a detector says an image is 92% likely AI-generated with high confidence, that is a strong signal worth investigating further — but it is not the same as catching someone in the act of using an AI generator. If a detector says an image is 8% likely AI-generated (likely human-made), that does not rule out the possibility that it was AI-generated and then heavily edited. Always pair detection results with context: where did the image come from, who shared it, what does the metadata say, and does the content itself contain any visible inconsistencies?',
    },
    {
      heading: 'What to do when the result is uncertain',
      content:
        'Uncertain results — scores in the 31-70 range or any result with low confidence — are common and should not be treated as failures of the tool. They are honest answers to a genuinely difficult question. When you get an uncertain result, consider these next steps. First, check if a higher-quality version of the image is available and re-run the analysis. Second, look for metadata using a separate EXIF viewer — some AI generators embed comments or software tags that survive re-encoding. Third, perform a reverse image search (Google Images, TinEye, or Yandex) to find earlier appearances of the image and trace its origin. Fourth, examine the image yourself at full resolution looking for the classic AI artifacts: inconsistent reflections, mismatched earrings or eyewear, text that looks like simulated letterforms rather than real typography, and backgrounds that blur or warp in physically impossible ways. Fifth, if the stakes are high, seek a second opinion from a different detection tool. No single tool or method is definitive, and the combination of multiple approaches is always stronger than any one alone.',
    },
  ],
  crossLinks: crossLinksExcluding('/is-this-ai-generated'),
  faqs: [
    {
      question: 'Can I check images from social media with this tool?',
      answer:
        'Yes. If the image has a public HTTPS URL, paste it into the URL field. If not, download the image to your device and upload it. Keep in mind that social media platforms compress uploaded images, which can reduce detection accuracy.',
    },
    {
      question: 'Is there a limit to how many images I can check?',
      answer:
        'The free tier allows reasonable usage without hard rate limits. If you need to check a large volume of images, consider the paid tier for higher throughput and priority processing.',
    },
    {
      question: 'Does the tool work for AI-generated artwork and paintings?',
      answer:
        'Yes. The detection engines are trained on a mix of photographic and artistic images. However, digital art — whether AI-generated or human-made — can be more challenging to classify than photographs because both tend to lack camera metadata and sensor noise patterns.',
    },
  ],
};

// ── Export map ───────────────────────────────────────

export const pageContentMap: Record<string, PageContent> = {
  '/check': checkContent,
  '/ai-image-checker': aiImageCheckerContent,
  '/ai-image-detector': aiImageDetectorContent,
  '/detect-ai-generated-image': detectAiGeneratedContent,
  '/is-this-ai-generated': isThisAiGeneratedContent,
};

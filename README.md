# SpotiFind: Revolutionizing Navigation for the Visually Impaired

<!-- HopperHacks X Submission -->
At HopperHacks, we pushed the boundaries of technology and with it healthcare using SpotiFind Rx. We crafted a sophisticated navigation aid that empowers visually impaired users through real-time, voice-activated guidance and advanced object recognition, all while maintaining a fun, engaging user experience.

## Inspiration
Our journey began with a simple yet powerful idea: leverage **cutting-edge AI** and community collaboration to ease everyday challenges for those who need it most. With languages shifting and cultures blending, we set out to create an experience that feels uniquely personalized, no matter who you are.

## What It Does
SpotiFind Rx transforms the way users interact with their surroundings by combining several innovative features:

- **Voice-Activated Navigation:** A single voice command triggers the app to identify objects in the environment and provide clear, obstacle-free directions.
- **Advanced Object Recognition & Depth Mapping:** Utilizing a complex, on-device multimodal pipeline powered by open source models from OpenAI, Ultralytics, and more, SpotiFind Rx reliably identifies and maps objects around you.
- **Hyper-Personalized Multilingual Experience:** By integrating Google’s Gemini model with an ultra-long context window, the app translates its entire interface and extracts target objects from initial instructions, ensuring a tailored experience for every user.
- **Crowd-Sourced Accessibility:** Our platform enables community participation by allowing anyone to geotag obstacles—such as potholes and construction zones—thereby improving navigation safety for all.
- **Pirate Theme:** Embracing a spirited, all-new pirate theme in line with HopperHacks, the app now offers a playful and adventurous interface.
- **Prescription Upload & OCR Facilities:** Users can upload their prescriptions with integrated OCR technology, streamlining the process of managing important medical information.
- **Intelligent Medicine Bottle Recognition:** The standalone assistant now detects whether a bottle is a medicine bottle and verifies if it is part of the user’s prescription. If it isn’t, the app provides crucial details about its uses and potential side effects.

## How it was built
We are grateful to have such a huge ecosystem of tools to rely on.
1. v0 by Vercel - Created our basic, barebones web application
2. Hugging Face - Access to **efficient**, modern, open-source AI/ML models for our on-device pipeline.
3. DALL-E - Stable diffusion powered tool to help us generate our awesome logo
4. Leonardo.ai - To generate assets for the website: background, ship, compass, etc.
5. CapCut - For editing our awesome promotional video

## Challenges We Ran Into
Developing SpotiFind Rx with this feature set was a formidable challenge, multiplied by the time constraints:

- **Complex Integration:** Managing **multiple AI models** on a single device required us to optimize our models while making sure the accuracy remains unchanged.
- **Extended Testing Cycles:** Ensuring seamless functionality across diverse lighting conditions and objects demanded rigorous and prolonged testing.
- **Personalization Complexity:** Catering to over 100 languages and extracting meaningful context from varied voice commands pushed our translation and natural language processing capabilities to their limits.

## Accomplishments We’re Proud Of
Despite the hurdles, our accomplishments speak volumes about our commitment and innovation:

- Developed a full-stack prototype powered by MongoDB Atlas and Next.js, deployed on Vercel.
- Implemented a robust, on-device AI pipeline for obstacle avoidance and real-time navigation.
- Delivered personalized, multilingual interactions that adapt to each user’s unique context.
- Enabled crowd-sourced obstacle mapping to enhance community-driven accessibility.
- Introduced a suite of new features: pirate-themed design, prescription upload with OCR, and intelligent medicine bottle recognition that set SpotiFind Rx apart.

## What We Learned
Our journey with SpotiFind Rx has been as educational as it has been exhilarating:

- **Hardware Potential:** We discovered that sophisticated AI can operate efficiently on modest hardware with a few tweaks (our prototype ran on an Intel i5 CPU)!
- **Seamless Multimodal Integration:** Merging various AI modalities can create natural, intuitive user interactions.
- **Community Collaboration:** Empowering users to contribute not only enriches the app’s functionality but also fosters a strong, supportive network.

## What’s Next for SpotiFind Rx
While we’ve achieved remarkable milestones, the adventure continues:

- **Enhanced Processing:** Integrating specialized graphics processing units will further boost speech recognition and real-time direction delivery.
- **Broader Personalization:** We aim to expand language support and refine our translation accuracy, ensuring an even more intuitive experience.
- **Feature Expansion:** We’re exploring more user friendly ways to crowdsource and use the obstacle information.
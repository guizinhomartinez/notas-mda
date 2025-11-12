import ExplanationPages from "@/components/explanation-pages";
import { Separator } from "@/components/ui/separator";

export default function Sobre() {
    return (
        <ExplanationPages>
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="mb-4 text-center text-5xl font-bold md:text-7xl">
                    O que é o MDA?
                </h1>
            </div>
            <Separator />
            <div className="text-justify text-lg [&>h2]:mt-4 [&>h2]:mb-2 [&>h2]:text-center [&>h2]:font-bold">
                <div className="flex flex-col gap-1.5 indent-8">
                    <p>
                        O MDA — três letras simples, mas que carregam o peso de
                        incontáveis histórias, risadas, dilemas e madrugadas
                        insones. Ninguém sabe ao certo quando ele nasceu, mas
                        desde o momento em que foi criado, algo mudou para
                        sempre. Aquilo que começou como um grupo qualquer, feito
                        às pressas e talvez sem grandes pretensões, tornou-se um
                        microcosmo emocional, um universo paralelo onde o tempo
                        parece se dobrar entre ironias, áudios longos e
                        mensagens enviadas às 2h da manhã.
                        <br />
                    </p>
                    <p>
                        No MDA, o banal se transforma em épico. Um simples
                        “mano, tu não vai acreditar” pode desencadear uma
                        sequência de acontecimentos dignos de novela mexicana.
                        Cada conversa é uma espécie de ritual — o tipo de
                        catarse que só se alcança quando se fala com quem
                        entende, com quem compartilha não só as alegrias, mas
                        também as derrotas sutis do cotidiano. <br />
                    </p>
                    <p>
                        É ali que o tédio vira piada, o amor vira debate e a
                        tristeza encontra consolo. Ali, as máscaras caem. Não há
                        pose, não há filtro, não há performance. Apenas a crueza
                        da amizade em seu estado mais puro — três vozes que se
                        revezam entre a ironia e o afeto, entre o deboche e o
                        desabafo. <br />
                    </p>
                    <p>
                        As mulheres de quem falamos ganham, por instantes, o
                        papel de musas, enigmas, tempestades que nos atravessam
                        e deixam rastros. Cada história, cada olhar, cada
                        conversa é dissecada com a seriedade de um tribunal e o
                        humor de um bar lotado. O MDA é o palco onde a mente
                        masculina se desnuda, onde o coração fala mais alto,
                        mesmo quando tenta disfarçar em sarcasmo. <br />
                    </p>
                    <p>
                        Mas não se engane: o MDA não é só sobre fofocas ou
                        paixões. É sobre sobrevivência emocional. É o ombro
                        invisível em que se apoia quem não sabe mais o que
                        sentir. É o lugar onde se confessa o que não se tem
                        coragem de dizer a mais ninguém. Onde se ri de si mesmo
                        e, no meio do riso, se encontra um pouco de sentido.{" "}
                        <br />
                    </p>
                    <p>
                        Há dias em que o MDA parece um campo de batalha —
                        opiniões cruzam como flechas, e cada resposta vem
                        carregada de emoção. Em outros, é um abrigo silencioso,
                        onde basta um “tá tudo bem?” para lembrar que a amizade
                        ainda é uma das poucas coisas que o mundo não conseguiu
                        corromper. <br />
                    </p>
                    <p>
                        O MDA é, no fim das contas, a prova de que amizade
                        masculina também tem alma. Que por trás das piadas e dos
                        memes, há vulnerabilidade, ternura e um desejo sincero
                        de não enfrentar o peso da vida sozinho. <br />
                    </p>
                    <p>
                        Três nomes, três histórias, uma irmandade selada por
                        risadas, segredos e uma compreensão que não se explica —
                        apenas se sente. <br />
                    </p>
                    <p>
                        O MDA é o lar invisível de três corações que, de alguma
                        forma, sempre voltam para casa quando a notificação
                        acende. <br />
                    </p>
                </div>
            </div>
        </ExplanationPages>
    );
}

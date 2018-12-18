<?php
/**
 * Created by PhpStorm.
 * User: Rafa
 * Date: 10/12/2018
 * Time: 17:46
 *
 * @package EasyRdf
 */

namespace App\Controller;

use App\Service\RDFService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api", name="api")
 */
class DefaultController extends AbstractController
{
    /**
     * @Route("/accidentes", name="api_v1")
     */
    public function index() {
        return $this->render('base.html.twig');
    }

    /**
     * @Route("/accidentes/{id}", name="", methods={"GET"})
     * @param string $id
     * @return Response
     */
    public function rol(string $id)
    {
        $response = null;

        $service = new RDFService();
        $response = $service->getInfo($id);

        return $this->render('dato.html.twig', array('dato' => $response));
    }
}